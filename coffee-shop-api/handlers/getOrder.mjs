import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "orders";

export const handler = async (event) => {
    try {
        const orderId = event.pathParameters.order_id;

        const result = await dynamoDB.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { order_id: orderId }
        }));

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Order not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error("Error retrieving order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};