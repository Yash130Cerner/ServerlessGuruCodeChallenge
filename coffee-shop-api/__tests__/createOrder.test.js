import { jest } from '@jest/globals';
import { handler } from "../handlers/createOrder.js";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import * as validator from "../handlers/validators/orderValidator.js";

// Mock the DynamoDB client
const ddbMock = mockClient(DynamoDBDocumentClient);

describe("createOrder handler", () => {
  const validOrder = {
    order_id: "12345",
    customer_name: "Test User",
    items: [{ name: "Latte", size: "Medium", price: 4.5 }],
    total_price: 4.5
  };

  beforeEach(() => {
    ddbMock.reset(); // Reset DynamoDB mocks
    jest.restoreAllMocks(); // Reset all previous spies/mocks
  });

  it("should return 201 on successful order creation", async () => {
    ddbMock.on(PutCommand).resolves({});

    jest.spyOn(validator.createOrderSchema, "validate").mockReturnValue({ value: validOrder, error: null });

    const event = {
      body: JSON.stringify(validOrder)
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body).message).toBe("Order created successfully");
  });

  it("should return 400 for validation error", async () => {
    jest.spyOn(validator.createOrderSchema, "validate").mockReturnValue({ error: new Error("Invalid input") });

    const event = {
      body: JSON.stringify({})
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe("Invalid input");
  });

  it("should return 500 for internal server error", async () => {
    ddbMock.on(PutCommand).rejects(new Error("Dynamo error"));

    jest.spyOn(validator.createOrderSchema, "validate").mockReturnValue({ value: validOrder, error: null });

    const event = {
      body: JSON.stringify(validOrder)
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).error).toBe("Internal Server Error");
  });
});