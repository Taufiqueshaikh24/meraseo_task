# task

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

## Backend

1. Navigate to the `backend` folder:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm run watch
    ```

    This will run the backend server using nodemon at `http://localhost:4444`.

## Frontend

1. Navigate to the `frontend` folder:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend server:
    ```sh
    npm run dev
    ```

    This will run the frontend server at `http://localhost:3000`.

4. To build the frontend for production:
    ```sh
    npm run build
    ```

## Download Zip Folder

If you prefer, you can also download the project as a zip folder. Once you've downloaded and extracted the zip folder, follow the instructions above to run the project.

## Scripts

Here are some useful npm scripts for the project:

### Backend
- `npm run watch`: Run the backend server with nodemon.
- `npm run dev`: Run the backend server (`node index`).

### Frontend
- `npm run dev`: Start the frontend server.
- `npm run build`: Build the frontend for production.

## Additional Notes

- Make sure to configure any necessary environment variables.
- Ensure that the backend server is running before starting the frontend server.

