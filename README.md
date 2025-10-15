# Credit Report Analyzer 📈

A full-stack MERN (MongoDB, Express, React, Node.js) application designed to parse, store, and display financial credit reports from XML files. This project takes complex XML data, transforms it into a structured format, and presents it in a clean, professional, and responsive user interface.

---

## Features ✨

* **File Upload**: Secure endpoint for uploading XML credit report files.
* **XML Parsing**: Robust backend logic to parse complex XML and extract key financial data points.
* **Data Persistence**: Stores structured report data in a MongoDB database for persistence and retrieval.
* **RESTful API**: A well-defined API to manage report data (upload, get all, get by ID).
* **Interactive Frontend**: A dynamic and user-friendly interface built with React to display reports.
* **Detailed Reporting**: Breaks down the credit report into easy-to-understand sections:
    * Basic Details with a visual Credit Score
    * A comprehensive Report Summary
    * A table of all Credit Accounts
    * A list of Addresses on file
* **Modular Codebase**: Organized and scalable project structure for both frontend and backend.

---

## Tech Stack 🛠️

* **Frontend**: React, React Router, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **File Handling**: Multer
* **XML Parsing**: xml2js

---

## Setup and Installation

Follow these steps to get the development environment running locally.

### Prerequisites

* Node.js (v14 or later)
* npm (Node Package Manager)
* MongoDB: A running instance of MongoDB (either local or on a cloud service like MongoDB Atlas).

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd creditsea-app
2. Backend Setup
```
Navigate to the backend directory:

```bash

cd backend
```
Install the required dependencies:

```bash

npm install
```
Create a .env file in the backend root directory. This file will store your environment variables. Add the following, replacing the placeholder with your MongoDB connection string:

```bash

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```
3. Frontend Setup
Navigate to the frontend directory from the project root:

```bash

cd frontend
```
Install the required dependencies:

```bash

npm install
```
Running the Application 🚀
You will need two separate terminal windows to run both the backend and frontend servers simultaneously.

Start the Backend Server (from the /backend directory):

```bash

npm run dev
```
The server will start on http://localhost:5001.

Start the Frontend Server (from the /frontend directory):

```bash

npm start
```
The React application will open in your browser at http://localhost:3000.

The application is now running! You can upload an XML file to see it in action.

## API Endpoints
The backend provides the following RESTful API endpoints:

Method	Endpoint	Description
```bash
POST	/api/reports/upload
```
Uploads and processes a new XML credit report.
```bash
GET	/api/reports
```
Retrieves a list of all available reports.
```bash
GET	/api/reports/:id
```
Retrieves the full details of a specific report.








