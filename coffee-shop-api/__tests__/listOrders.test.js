import { handler } from "../handlers/listOrders.js";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Mock DynamoDB
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("listOrders handler", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should return list of orders", async () => {
    const mockOrders = [
      { order_id: "1", customer_name: "John" },
      { order_id: "2", customer_name: "Alice" }
    ];

    // Mock ScanCommand to return mockOrders
    ddbMock.on(ScanCommand).resolves({ Items: mockOrders });

    const event = {}; // no need for body in GET

    const result = await handler(event);

    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(Array.isArray(body.orders)).toBe(true);
    expect(body.orders.length).toBe(2);
    expect(body.orders[0].customer_name).toBe("John");
  });
});