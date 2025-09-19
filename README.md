🏥 Patient Management System
This is a full-stack web application designed to streamline hospital operations by managing patient records, doctors, and appointments. The system provides a centralized dashboard for hospital staff to track key metrics and efficiently handle daily tasks.

✨ Features
Dashboard: A comprehensive overview displaying total doctors, patients, appointments, and upcoming appointments. The dashboard also highlights top doctors and recent patient reviews.

Appointment Booking: A user-friendly interface for patients to book appointments with their preferred doctors.

Patient Management: Add new patient records, view patient details, and search for existing patients by name or contact number.

Doctor Management: Register new doctors with their details, including specialization and experience.

Responsive UI: Built with Material-UI for a modern, clean, and responsive design across various devices.

Theme Toggle: A dark mode feature to switch the application's theme for user preference.

💻 Technologies Used
Backend
Node.js: JavaScript runtime environment.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for flexible data storage.

Mongoose: MongoDB object data modeling (ODM) for Node.js.

CORS: Middleware to enable cross-origin requests.

Morgan: HTTP request logger middleware.

Frontend
React: JavaScript library for building user interfaces.

Material-UI (MUI): A popular React UI framework for a polished, component-based design.

React Router DOM: For handling client-side routing.

Axios: For making API requests to the backend.

🚀 Getting Started
Follow these steps to set up and run the project on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (which includes npm)

MongoDB

Backend Setup
Navigate to the backend directory and install the dependencies:

Bash

cd backend
npm install
Create a .env file in the backend folder and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string
PORT=5000
You can get your MongoDB URI from a service like MongoDB Atlas or a local MongoDB installation.

Start the backend server:

Bash

npm start
The server will run on http://localhost:5000.

Frontend Setup
Open a new terminal, navigate to the frontend directory, and install the dependencies:

Bash

cd ../frontend
npm install
Start the React application:

Bash

npm start
The application will open in your browser at http://localhost:3000.

🤝 Contribution
Feel free to open an issue or submit a pull request if you have any suggestions for improvements or new features.

📄 License
This project is licensed under the MIT License.
