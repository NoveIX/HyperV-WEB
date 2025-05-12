# HyperV-WEB

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-3178C6?style=for-the-badge&logo=gnu)](https://www.gnu.org/licenses/gpl-3.0) [![.NET](https://img.shields.io/badge/.NET-8.0.15-5C2D91?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/download/dotnet/8.0) [![PowerShell](https://img.shields.io/badge/PowerShell-5.1-012456?style=for-the-badge&logo=powershell)](https://learn.microsoft.com/powershell/) [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/) [![NPM](https://img.shields.io/badge/NPM-9.x-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/) [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/) [![Material UI](https://img.shields.io/badge/Material--UI-5.14.18-0081CB?style=for-the-badge&logo=mui)](https://mui.com/) [![Axios](https://img.shields.io/badge/Axios-1.6.2-5A29E4?style=for-the-badge&logo=axios)](https://axios-http.com/) [![Swagger](https://img.shields.io/badge/Swagger-6.6.2-85EA2D?style=for-the-badge&logo=swagger)](https://swagger.io/) [![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/apps/aspnet)

A modern web-based interface for managing Hyper-V virtual machines. This application provides a user-friendly way to monitor and control your Hyper-V environment through a responsive web interface.

## 🏗️ Architecture

HyperV-WEB follows a client-server architecture:

- **Backend**: A .NET 8 API written in C# that interfaces with Hyper-V through PowerShell commands
- **Frontend**: A React-based single-page application with Material UI for a modern, responsive interface

The application uses a RESTful API approach for communication between the frontend and backend components.

## ✨ Main Features

- **VM Management**:
  - View all virtual machines with their current status
  - Start and stop virtual machines
  - Delete virtual machines
- **Real-time Updates**: Automatic refresh of VM status every 30 seconds
- **Modern UI**: Clean, responsive interface built with Material UI
- **System Shutdown**: Safely shut down the application services

## 🔧 System Requirements

### Prerequisites

- Windows operating system with Hyper-V enabled
- .NET 8.0 SDK or Runtime
- Node.js (v14 or higher) and npm
- PowerShell with execution permissions for Hyper-V commands
- Administrator privileges (for Hyper-V operations)

## 📦 Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/HyperV-WEB.git
   cd HyperV-WEB
   ```

2. Restore dependencies using the provided script:
   ```
   restore_dependencies.bat
   ```
   This script will install all required packages for both the frontend and backend components.

## 🚀 Usage

### Starting the Application

Run the provided batch file to start both the backend and frontend services:

```
start_services.bat
```

This will:
- Start the .NET backend API on http://localhost:5062
- Launch the React frontend on http://localhost:3000

### Accessing the Interface

Open your browser and navigate to:
```
http://localhost:3000
```

### Stopping the Application

To stop all services, use the provided batch file:

```
stop_services.bat
```

## 📁 Project Structure

```
HyperV-WEB/
├── Backend/                  # .NET 8 API
│   ├── Controllers/          # API endpoints
│   │   └── HyperVController.cs
│   ├── Services/             # Business logic
│   │   └── HyperVService.cs
│   ├── Properties/           # .NET configuration
│   ├── appsettings.json      # Application settings
│   └── Backend.csproj        # Project file
├── Frontend/                 # React application
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   │   ├── VMList.js     # VM management interface
│   │   │   └── ShutdownButton.js
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Entry point
│   └── package.json          # NPM dependencies
├── restore_dependencies.bat  # Dependency installation script
├── start_services.bat        # Application startup script
└── stop_services.bat         # Application shutdown script
```

### Key Configuration Files

- **Backend/appsettings.json**: Contains backend configuration settings
- **Frontend/package.json**: Lists frontend dependencies and scripts
- **Backend.csproj**: Defines .NET project settings and dependencies

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Developed with ❤️ for Hyper-V administrators
