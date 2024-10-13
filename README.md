Event-Management-Platform
A Google Developer Program MERN Stack Project Repository

To run this project locally, follow the steps below:
Step 1:
Download and extract the repository folder on your computer.

Step 2:
Open the "client" folder in the CLI using the cd client command, and run npm install to download the frontend dependencies.

Step 3:
By default, the frontend will communicate with the backend using the API instance https://eventmanagementplatformserverpoint.onrender.com/api in the api.js file. To change this, you can replace it with http://localhost:4008/api to run with the local backend.

Step 4:
Open the "ServerPoint" folder in the CLI using the cd ServerPoint command, and run npm install to download the backend dependencies.

Step 5:
Create a .env file inside the ServerPoint folder. Add the following variables:

PORT=YOUR_PORT_NUMBER_TO_RUN_BACKEND
MONGO_URI="REPLACE_WITH_YOUR_ATLAS_MONGO_URI"
JWT_SECRET="REPLACE_WITH_YOUR_SECRET_KEY"

Step 6:
Run the npm start command in both the client and ServerPoint folders to start the servers. The application will start automatically.
