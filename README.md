# This is a simple todo list app built with Next.js, Clerk, and MongoDB.

## Prerequisites

- Node.js
- MongoDB
- Clerk

## Environment Variables

- MONGODB_URI
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- NEXT_PUBLIC_CLERK_SIGN_IN_URL
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

# Folder Structure
.
├── app
│   ├── (auth) // Clerk auth pages
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.jsx
│   │   └── sign-up
│   │       └── [[...sign-up]]
│   │           └── page.jsx
│   ├── api
│   │   └── todos
│   │       └── route.js  // API route for todos CRUD operations with MongoDB
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.js  // Common layout for all pages
│   ├── mytodos
│   │   └── page.js  // My todos page
│   ├── page.js
│   ├── protected
│   │   └── page.jsx  // Protected page
│   └── public
│       └── page.jsx  // Public page
├── components
│   └── ui  // Shadcn UI components
│       ├── button.jsx
│       ├── card.jsx
│       ├── checkbox.jsx
│       ├── form.jsx
│       ├── input.jsx
│       └── label.jsx
├── lib
│   ├── mongoose.js // MongoDB connection
│   └── utils.js // Utility functions from tailwind
├── middleware.js // Clerk middleware
└── models
    └── Todo.js  // MongoDB model for todos
