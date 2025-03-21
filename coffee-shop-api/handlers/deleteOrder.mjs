import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "orders";

export const handler = async (event) => {
    try {
        const orderId = event.pathParameters.order_id;

        // **Ensure the order exists before deletion**
        const conditionExpression = "attribute_exists(order_id)";

        await dynamoDB.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { order_id: orderId },
            ConditionExpression: conditionExpression // Ensures only existing orders are deleted
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Order deleted successfully" }),
        };
    } catch (error) {
        if (error.name === "ConditionalCheckFailedException") {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Order not found" }),
            };
        }
        console.error("Error deleting order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};