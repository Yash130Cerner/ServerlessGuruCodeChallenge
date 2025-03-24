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

![image](https://github.com/user-attachments/assets/9de9f9c0-b29d-4095-9e02-bcfac2b81797)

---

## Infrastructure as Code (IaC) Design

All infrastructure is defined using the Serverless Framework and is modularized for scalability and readability:

- `serverless.yml` — Root configuration file
- `functions/` — Contains YAML files for each Lambda function (createOrder, getOrder, etc.)
- `resources/` — Contains `dynamodb.yml` to define the table
- Uses `${file(...)}` imports for clean separation of logic
- Enables `package.individually: true` for optimized Lambda deployment

Example structure:

![image](https://github.com/user-attachments/assets/a0ff2b2e-18c4-43eb-b5ba-bb8c3e922649)

---

## API Endpoints

> Base URL depends on deployed stage & region  
> Example: `https://zirp4704zf.execute-api.us-east-2.amazonaws.com/prod/orders`

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/orders`           | Create new order    |
| GET    | `/orders/{id}`      | Fetch specific order|
| GET    | `/orders`           | List all orders     |
| PUT    | `/orders/{id}`      | Update existing     |
| DELETE | `/orders/{id}`      | Cancel/delete order |

## AWS Lambda Functions

![image](https://github.com/user-attachments/assets/66bedda5-b96d-491d-8825-7325a09d6183)

## AWS API Gateway

![image](https://github.com/user-attachments/assets/49ab65d8-82b3-4db9-b00f-1ea15446ddfe)

![image](https://github.com/user-attachments/assets/d6dc4091-dc46-4c0d-95e3-4c0ed48fc7bc)

![image](https://github.com/user-attachments/assets/30571bb2-417f-4161-8268-cdb415ad598d)

---

## AWS Dynamo DB

![image](https://github.com/user-attachments/assets/c81649fc-abe8-4abb-8b80-80050bdbece5)

---

## AWS Cloud Watch and Cloud Formation

![image](https://github.com/user-attachments/assets/e8bd1f16-c52e-47ba-b95f-19722b391937)

![image](https://github.com/user-attachments/assets/c7292f1a-f6b2-4062-98b2-dc0404e1ae93)

---

## Live API Testing

The API has been fully tested using Postman.

![image](https://github.com/user-attachments/assets/11feadd8-9dd1-44ad-af8b-2b33252ea6ee)

Full test walkthrough included in Loom Video.

