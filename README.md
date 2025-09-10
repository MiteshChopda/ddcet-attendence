# DDCET-attendence

A personal attendence and notes taking web application for exam preparation.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **MySQL**: (install from https://mysql.com)
- **Node.js**:(install from https://nodejs.org)
- **npm**: Usually comes with Node.js

## Installation and Setup

Follow these steps to set up the development environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/MiteshChopda/ddcet-attendence
   ```

2. Navigate to the project directory:
   ```bash
   cd ddcet-attendence
   ```

3. Install root dependencies:
   ```bash
   npm i
   ```

4. Navigate to the backend directory and install its dependencies:
   ```bash
   cd backend
   npm i
   ```

5. Return to the root directory:
   ```bash
   cd ..
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

You may need to set up environment variables for database connection and other services. Create a `.env` file in the appropriate directory with the following variables:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

## Usage

After running `npm run dev`, your application should be available at:
- Frontend: http://localhost:5173 
- Backend API: http://localhost:3000 
