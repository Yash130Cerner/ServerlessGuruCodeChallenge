import { handler } from "../handlers/deleteOrder.js";
import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("deleteOrder handler", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should delete the order and return success", async () => {
    ddbMock.on(DeleteCommand).resolves({});

    const event = {
      pathParameters: {
        order_id: "123",
      },
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe("Order deleted successfully");
  });
});