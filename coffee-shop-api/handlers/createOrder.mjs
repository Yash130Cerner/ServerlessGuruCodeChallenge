import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "orders";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const order = {
            order_id: body.order_id,
            customer_name: body.customer_name,
            items: body.items,
            total_price: body.total_price,
            status: "pending"
        };

        await dynamoDB.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: order
        }));

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Order created successfully", order }),
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};