# Contact Management System

A Contact Management System built using Node.js, Express.js, MongoDB, and Mongoose.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Thunder Client

## Features

- Create a new contact
- Get all contacts
- Get a contact by ID
- Update a contact
- Delete a contact
- Validate phone number
- Validate email format
- Ensure email uniqueness
- Automatically generate unique contact IDs

## Contact Fields

| Field | Type | Validation |
|---|---|---|
| contactId | String | Unique, automatically generated |
| name | String | Required |
| phone | String | Required, exactly 10 digits |
| email | String | Required, valid and unique |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contacts` | Create a new contact |
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get a contact by ID |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

## Installation

1. Clone the repository.

2. Open the project folder in the terminal.

3. Install dependencies:

```bash
npm install