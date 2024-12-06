# SportSphere Backend 

Rishika Rajput - IIT2021117

## Overview

This is a Sports Facility Booking System that enables users to reserve sports facilities across different centers. The system includes key features such as user management, facility and sport management, as well as booking management, providing a seamless experience for both users and administrators.
![image](https://github.com/user-attachments/assets/2bc5a9a7-ca52-49cc-bab7-8f2d5004a3b6)

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB
- express
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```
   git clone [your-repository-url]
   cd [your-project-directory]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```

## Project Structure

- `config/`: Database configuration
- `controllers/`: Contains controller logic
- `models/`: Mongoose models for database schemas
- `routes/`: API route definitions
- `app.js`: Main application file

## API Endpoints

- Centers:
  - GET `/api/centers`: Fetch all centers
  - POST `/api/centers`: Create a new center

- Bookings:
  - GET `/api/bookings`: Fetch all bookings
  - POST `/api/bookings`: Create a new booking

- Sports:
  - GET `/api/sports`: Fetch all sports
  - POST `/api/sports/:centerId`: Create a new sport for a specific center

- Users:
  - GET `/api/users`: Fetch all users
  - POST `/api/users`: Create a new user
  - POST `/api/users/validate-user`: Validate user credentials

## Assumptions and Limitations

- Fixed Availability: The system is designed with the assumption that each sport offers a predetermined number of courts and time slots.
- Authentication Method: User authentication relies on a PIN-based system, secured with bcrypt hashing for enhanced security.
- No Payment Integration: The current version does not support payment processing for bookings.

## Deployed Applications

- Frontend:https://sport-sphere-frontend.vercel.app/
- Backend:https://sportsphere-backend.onrender.com/

## Future Improvements

- Enhanced Authentication: Upgrade to a secure and scalable authentication system using JSON Web Tokens (JWT).
- Payment Integration: Introduce seamless payment processing to confirm bookings securely.
- Admin Management Interface: Develop a dedicated UI for administrators to manage centers, sports, and user activities efficiently.
- Real-Time Updates: Implement live availability tracking for courts and time slots to improve booking accuracy.
- Improved Validation and Error Handling: Strengthen input validation and add comprehensive error-handling mechanisms for a smoother user experience.

