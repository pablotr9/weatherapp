---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following Node.js version installed:

- **Node.js:** `v22.21.0` (You can use a version manager like [nvm](https://github.com/nvm-sh/nvm)).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pablotr9/weatherapp.git
    cd weather-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or the port indicated by Vite)

## 🎨 Tech Stack & Design Choices

This project is built with the latest versions of **React 19** for the user interface and the **Vite** build tool for an extremely fast development workflow with instant HMR.
It uses **Typescript** for robust static typing.

For styling and UI, this project uses **shadcn/ui**. It's a collection of reusable components that are installed directly into the codebase, built on **Tailwind CSS** for styling and **Radix UI** for behavior and accessibility.

For the state management, in this simple case only **Zustand** was used as it allows managing global state with minimal boilerplate and a simple hook-based API. **TanStack Query** was used for managing server state, handling data fetching, caching, and synchronization automatically. with Axios for making the actual HTTP requests to the API.

**Zod** has also been used for the schema validation in the form and to validate the API data.

Simple tests for the **weatherCard** component were implemented using **Vitest**, a fast Vite-native test runner, and **React Testing Library** to simulate user interactions.
