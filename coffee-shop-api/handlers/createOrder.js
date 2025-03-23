import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { createOrderSchema } from "./validators/orderValidator.js";

// Use environment variable to support multi-stage table name
const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME; // Dynamic per stage

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const { error, value } = createOrderSchema.validate(body);
        if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid input", details: error.details }),
        };
        }

        const order = {
        ...value,
        status: "pending",
        created_at: new Date().toISOString()
        };

        await dynamoDB.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: order
        }));

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Order created successfully ", order }),
        };
    } catch (error) {
        console.error("Error creating order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};