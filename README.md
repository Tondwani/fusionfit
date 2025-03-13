*********************************************************************Personal Trainer Platform*******************************************************************************
This repository contains a Next.js frontend application for a Personal Trainer Platform where trainers can manage clients and meal plans.

**********************************************************************Overview********************************************************************************************8
FusionFit is a comprehensive Next.js application designed to connect personal trainers with their clients through a feature-rich platform for nutrition planning and fitness management. The system enables efficient client management, customized meal planning, and detailed food item tracking.

Authentication for trainers and clients
Client management capabilities
Food item management
Meal plan creation and assignment
Responsive design for mobile and desktop use

Features
Trainer Features

Register as a trainer
Login to the platform
Create and manage clients
Create and manage meal plans for clients
Create and manage food items

Client Features

Register after being added by a trainer
Login to the platform
View meal plans assigned by their trainer

Tech Stack

Frontend Framework: Next.js (App Router)
UI Library: Ant Design
State Management: Context API with useReducer
API Integration: Axios
Authentication: JWT

Getting Started
Prerequisites

Node.js 16.x or above
npm or yarn

Installation

Clone the repository:

bashCopygit clone https://github.com/yourusername/personal-trainer-platform.git
cd personal-trainer-platform

Install dependencies:

bashCopynpm install
# or
yarn install

Create a .env.local file in the root directory and add your environment variables:

CopyNEXT_PUBLIC_API_URL=https://body-vault-server-b9ede5286d4c.herokuapp.com

Run the development server:

bashCopynpm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the application.

Project Structure
Copyfusionfit/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── auth/            # Authentication components
│   ├── CreateClient/    # Client creation components
│   ├── FoodItems/       # Food item management components
│   └── policy/          # Policy components
├── providers/           # Context providers
│   ├── ClientMangementProvder/
│   ├── FoodItemProvider/
│   ├── MealPlanProvider/
│   └── TrainerProvider/
├── public/              # Static assets
├── styles/              # Global styles
└── utils/               # Utility functions
API Integration
The application integrates with a backend API with the following endpoints:
Authentication

POST /api/users/register: Register a trainer
POST /api/users/login: Login for trainers and clients
GET /api/users/current: Get current authenticated user
POST /api/users/register/mobile: Register a client

Client Management

POST /api/client: Create a client

Food Item Management

GET /api/food: Get all food items
GET /api/food/category/:category: Get food items by category
GET /api/food/search/:search_term: Search food items
POST /api/foodItems: Create a food item

Meal Plan Management

POST /api/mealplan: Create a meal plan
GET /api/mealplan/trainer/:trainer_id: Get a trainer's meal plans
GET /api/mealplan/client/:client_id: Get a client's meal plans
GET /api/mealplan/:plan_id: Get a specific meal plan

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements
This project was created as part of a frontend graduate project for learning Next.js, API integration, authentication, and state management in React applications.RetryClaude does not have internet access. Links provided may not be accurate or up to date.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
