import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "orders";

export const handler = async (event) => {
    try {
        const orderId = event.pathParameters.order_id;
        const body = JSON.parse(event.body);

        const updateExpression = "SET customer_name = :name, #itemsAlias = :items, total_price = :price";
        const expressionAttributeNames = {
            "#itemsAlias": "items" // Alias for reserved word 'items'
        };
        const expressionValues = {
            ":name": body.customer_name,
            ":items": body.items,
            ":price": body.total_price
        };

        // **Prevent creating a new order if it doesn't exist**
        const conditionExpression = "attribute_exists(order_id)";

        const result = await dynamoDB.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { order_id: orderId },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionValues,
            ConditionExpression: conditionExpression, // Ensures the item must exist
            ReturnValues: "ALL_NEW"
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Order updated successfully", updatedOrder: result.Attributes }),
        };
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Order not found" }),
            };
        }
        console.error("Error updating order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};