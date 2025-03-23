import { handler } from "../handlers/getOrder.js";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("getOrder handler", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should return order details for valid order_id", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: {
        order_id: "123",
        customer_name: "John",
        total_price: 5.0,
        items: [{ name: "Espresso", size: "Small", price: 5.0 }],
      },
    });

    const event = {
      pathParameters: {
        order_id: "123",
      },
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).order.customer_name).toBe("John");
  });
});