# PM1 React App

This project is a React application (Vite version) designed to manage and display project information.  
It includes features such as searching for projects, viewing project details, login mock, and managing project statuses.

## Project Structure

```
pm1-react-app
├── index.html                # Main HTML entry (Vite)
├── src
│   ├── main.jsx             # Entry point for React (Vite)
│   ├── App.jsx              # Main App component (state/UI)
│   ├── Login.jsx            # Login page component
│   ├── components/
│   │   ├── RowItem.jsx      # Component representing a single project row
│   │   └── Icon.jsx         # SVG icon components
│   ├── data/
│   │   └── mockData.js      # Mock data simulating API responses for testing
│   ├── utils/
│   │   └── format.js        # Utility functions (formatDate, formatTime)
│   └── styles/
│       └── index.css        # CSS styles for the application
├── package.json             # npm configuration
├── vite.config.js           # Vite configuration
└── README.md                # Documentation for the project
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd pm1-react-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

## Features

- **Login mock:** Username and session stored in sessionStorage (auto logout when browser/tab closed)
- **Search Functionality:** Users can search for projects by name, account, or engineer.
- **Project Details:** Click on a project row to view more details, including engineers, start/end dates, and status.
- **Status Management:** Users can mark projects as complete or postpone them.
- **Responsive UI:** Works on desktop and mobile screens.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.