# Fetch Data MERN App

This repository contains a basic MERN (MongoDB, Express, React, Node.js) application to perform CRUD operations on a collection of idols. The server connects to a MongoDB database and provides a RESTful API to manage idol data.

## Installation

To get started with the app, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yashtilala412/fetch_data-MERN.git
    cd fetch_data-MERN
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

- `POST /idols`: Create a new idol.
- `GET /idols`: Get all idols.
- `GET /idols/:id`: Get a single idol by ID.
- `PATCH /idols/:id`: Update an idol by ID.
- `DELETE /idols/:id`: Delete an idol by ID.

