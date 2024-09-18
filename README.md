# JobHunter
AI powered Employment Platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= v12.x.x) and **npm** (>= v6.x.x): [Download Node.js](https://nodejs.org/en/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/TENSHKUMAR-KKT-2004/JobHunter
```

### 2. Navigate into the Project Directory

```bash
cd JobHunter
```

### 3. Setting Up the Frontend

#### 3.1 Navigate to the frontend directory:

```bash
cd frontend
```
#### 3.2 Install the dependencies:

```bash
npm install
```

#### 3.3 Start the development server:

```bash
npm run dev
```

The frontend will start running at http://localhost:5173 (or any other available port)

### 4. Setting Up the Backend

#### 4.1 Navigate to the backend directory:

```bash
cd backend
```
#### 4.2 Install the dependencies:

```bash
npm install
```

#### 4.3 Start the development server:

```bash
npm run dev
```

The backend will start running at http://localhost:3000

### 4. Configure environment variables:

Create a `.env` file in the `backend` directory with the `.env.sample` contents

#### For mock interview app

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3Rhci1tYW1tb3RoLTE0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_Ufgb9zpxVrFKUyJJUUNW9LLxingK0zuU9G1O9QZWbM
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDUWch15btYySciiu4i4tQpDKV_kIFJFKE
```

#### For JobHunter

##### backend

```bash
PORT=3000
MONGODB_URL=mongodb+srv://jobPortal:TlfvkkZNkkoGWp0G@blog.dm0zbcz.mongodb.net
ACCESS_TOKEN_SECRET=3ba96ae11cb5c73c1312bf608d6604e7477cae33687f862a09a46deb0705c6e7
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=71ff56fc082eeb9ef3c56c812d2919f4bf90cae24cbbb3421b6c5bfc81eba04c
REFRESH_TOKEN_EXPIRY=10d

OPENAI_API_KEY=your_openai_api_key
```


