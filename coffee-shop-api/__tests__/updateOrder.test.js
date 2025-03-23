import { handler } from "../handlers/updateOrder.js";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("updateOrder handler", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should update order and return success", async () => {
    ddbMock.on(UpdateCommand).resolves({});

    const event = {
      pathParameters: { order_id: "123" },
      body: JSON.stringify({ status: "completed" }),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe("Order updated successfully");
  });
});