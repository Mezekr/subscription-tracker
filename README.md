# Subscription tracker

A Subscription tracking or management system API that handles real users, subscriptions, and real business logic.

Authenticate users using JWTs, connect to a database, create models and schemas and integrate with ORMs.

## 🛠 Tech Stack

-   [Node.js](https://nodejs.org)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Upstach](https://upstash.com/)
-   [Arcjet](https://arcjet.com/)

## ✅ Features

-   [x] **Manage Subscription**: provides a set of features as a backend API with endpoints for creating, updating, deleting, retrieving, viewing, canceling, and more.

-   [x] **Advanced Rate Limiting and Bot Protection**: with Arcjet that protect the API from Distributed Denial of Service (DDoS) attack, brute force attacks and other malicious. attacks.

-   [x] **Database Modeling**: Detailed MongoDB & Mongoose's models with pre-checking mechanism and clear relationships.

-   [x] **JWT Authentication**: Provides user authentication to protect the API.

-   [x] **Global Error Handling**: Integrate custom error handler middleware for input validation and DB error handling.

-   [x] **Logging Mechanisms**: For more efficient debugging and monitoring.

-   [x] **Sending Email Reminders**: Provides automated, intelligent email reminders that are sent out for subscription renewals with workflows using Upstash.

## 💻 Quick Start

To try the project on your computer, follow these steps to set it up:

**Prerequisites**

✅ Make sure you have the following installed on your machine:

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en)
-   [npm](https://www.npmjs.com/)

✅ Create an account with [Upstach](https://upstash.com/) and [Arcjet](https://arcjet.com/), and get the authentication tokens.

1. **Cloning the Repository**

```bash
git clone https://github.com/Mezekr/subscription-tracker.git
cd subscription-tracker
```

2. **Installation**

Install the project dependencies using npm:

```bash
npm install
```

3. **Set Up Environment Variables**

Create a new `.env.local` file in the root of the project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
EMAIL_ADDRESS=
```

4. **Running the Project**

```bash
npm run dev
```

5. Open the project in browser or any HTTP client to test the project:
    > [http://localhost:5500](http://localhost:5500)

# Subscription template

```json
{
	"name": "Example Subscription",
	"price": 10,
	"currency": "EUR",
	"frequency": "monthly",
	"category": "entertainment",
	"startDate": "2025-04-19",
	"paymentMethod": "Credit Card"
}
```
