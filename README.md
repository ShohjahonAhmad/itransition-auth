# User Management Frontend

Frontend application for the User Management System built with React Router v7, TypeScript, and Tailwind CSS.

## Features

- User registration
- User login
- Email verification flow
- Protected routes for authenticated users
- Responsive user management dashboard
- User selection using checkboxes
- Select all / deselect all functionality
- Block users
- Unblock users
- Delete users
- Delete unverified users
- Status messages for successful operations
- Tooltips for toolbar actions
- Automatic logout when the authenticated user becomes blocked or deleted

## Tech Stack

- React Router v7
- TypeScript
- Tailwind CSS
- Fetch API

## Installation

Clone the repository:

```bash
git clone https://github.com/ShohjahonAhmad/itransition-auth
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=<backend-api-url>
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

| Variable     | Description     |
| ------------ | --------------- |
| VITE_API_URL | Backend API URL |

## Authentication

Authentication is handled using JWT tokens stored in localStorage.

Protected pages automatically redirect unauthenticated users to the login page.

If a user's account is deleted or blocked while logged in, the application removes the stored token and redirects the user to the login page.

## User Management

The dashboard provides a toolbar for performing bulk actions on selected users:

- Block
- Unblock
- Delete
- Delete unverified

Multiple rows can be selected using checkboxes. The header checkbox selects or deselects all users.

## Deployment

The frontend is deployed separately from the backend and communicates through the configured API URL.
