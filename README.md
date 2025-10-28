---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following Node.js version installed:

- **Node.js:** `v22.21.0` (You can use a version manager like [nvm](https://github.com/nvm-sh/nvm) to easily switch versions).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repository.git](https://github.com/your-username/your-repository.git)
    cd weather-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    This project requires an API key to connect to the weather service.

    - Create a `.env` file in the root of the project.
    - Add your API key as follows:

    ```env
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:5173](http://localhost:5173) (or the port indicated by Vite) in your browser to see the app!
