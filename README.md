# Coffee Shop Serverless API

A fully serverless, production-ready REST API built using **AWS Lambda**, **API Gateway**, and **DynamoDB**, managed with **Serverless Framework** and deployed via a **CI/CD pipeline**.

This project simulates a real-world coffee shop backend where customers can place, view, update, and delete orders — built with scalability, modularity, and best practices in mind.

---

## Tech Stack

- **Runtime**: Node.js 20 (ESM modules)
- **Framework**: Serverless Framework v3
- **Cloud Provider**: AWS
  - Lambda (Business Logic)
  - API Gateway (REST Endpoints)
  - DynamoDB (Persistent Storage)
- **CI/CD**:
  - AWS CodePipeline + CodeBuild (automated deployment)
- **Validation**: Joi Schema
- **Testing**: Jest with AWS SDK Client Mock
- **IaC**: serverless.yml (modularized)

---

## Features

- Modular function structure with YAML imports
- Full CRUD operations:
  - `POST /orders` – Create new order
  - `GET /orders/{order_id}` – Get single order
  - `GET /orders` – List all orders
  - `PUT /orders/{order_id}` – Update order
  - `DELETE /orders/{order_id}` – Cancel/delete order
- Joi schema validation (CreateOrder)
- Unit test coverage for all Lambda handlers
- IAM roles scoped per Lambda permissions
- Multi-stage deployment support: `dev`, `prod`

---

## CI/CD Pipeline

| Step                      | Description                                      |
|----------------------------|--------------------------------------------------|
| GitHub Push (main branch)  | Triggers AWS CodePipeline                       |
| CodePipeline               | Orchestrates CodeBuild                          |
| CodeBuild                  | Installs dependencies + runs `serverless deploy` |
| Serverless Framework       | Deploys Lambda, API Gateway, and DynamoDB       |

**Screenshots** of CodePipeline setup and successful deployment are included in the repository.

![image](https://github.com/user-attachments/assets/7fc799fe-004f-427c-8a71-3cad474893d8)

![image](https://github.com/user-attachments/assets/191aace7-66b6-46aa-aa82-483f6dc5e55f)

![image](https://github.com/user-attachments/assets/d1decc3c-26ef-4707-94a3-c48addf28056)

---

## API Endpoints

> Base URL depends on deployed stage & region  
> Example: `https://abc123.execute-api.us-east-2.amazonaws.com/dev`

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/orders`           | Create new order    |
| GET    | `/orders/{id}`      | Fetch specific order|
| GET    | `/orders`           | List all orders     |
| PUT    | `/orders/{id}`      | Update existing     |
| DELETE | `/orders/{id}`      | Cancel/delete order |

Sample payload for POST `/orders`:
```json
{
  "order_id": "001",
  "customer_name": "John Doe",
  "items": [
    { "name": "Latte", "size": "Large", "price": 5.25 },
    { "name": "Espresso", "size": "Small", "price": 2.75 }
  ],
  "total_price": 8.00
}
