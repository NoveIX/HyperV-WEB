# HyperV-WIB

## Overview

HyperV-WIB is a web application designed to manage Hyper-V virtual machines. It features a .NET Core backend API and a React frontend for user interaction.

## Project Structure

The project is organized into the following main directories:

-   `/Backend`: Contains the ASP.NET Core web API that interacts with Hyper-V.
-   `/Frontend`: Contains the React single-page application for the user interface.
-   `start_services.bat`: A batch script to start both backend and frontend services.
-   `stop_services.bat`: A batch script to stop both backend and frontend services.

## Prerequisites

Before you begin, ensure you have the following software installed:

-   [.NET SDK](https://dotnet.microsoft.com/download) (version specified in `Backend.csproj` or latest stable)
-   [Node.js and npm](https://nodejs.org/) (latest LTS version recommended)
-   [Yarn](https://yarnpkg.com/) (optional, if you prefer it over npm)
-   Hyper-V enabled on your Windows machine.

## Getting Started

### Backend Setup

1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Restore .NET dependencies:
    ```bash
    dotnet restore
    ```
3.  Run the backend application:
    ```bash
    dotnet run
    ```
    The API will typically be available at `https://localhost:5001` or `http://localhost:5000` (check `Properties/launchSettings.json` for exact URLs).

### Frontend Setup

1.  Navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install Node.js dependencies:
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    # or if you use yarn
    # yarn start
    ```
    The frontend application will typically be available at `http://localhost:3000`.

### Running the Application with Scripts

Alternatively, you can use the provided batch scripts in the root directory to manage the services:

-   To start both backend and frontend services:
    ```bash
    start_services.bat
    ```
-   To stop both backend and frontend services:
    ```bash
    stop_services.bat
    ```

## Technologies Used

-   **Backend**: ASP.NET Core, C#
-   **Frontend**: React, JavaScript, HTML, CSS
-   **Hyper-V Management**: PowerShell cmdlets via .NET

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is currently unlicensed. Please add a license file if you intend to distribute it.