
# Invoice App

A simple invoice management application built with Node.js and TypeScript, offering basic functionalities to create, read, update, and delete invoices through a RESTful API.

## Features

- **Create, Read, Update, and Delete (CRUD)** operations for invoices.
- RESTful API architecture for managing invoices.
- Modular and maintainable code structure using TypeScript.
- Lightweight and easy to extend or integrate with front-end applications.

## Installation

### Prerequisites
Make sure you have Node.js and npm installed.

### Steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/dritongit/invoice_app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd invoice_app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

- **Run the application in development mode**
  ```bash
  npm run dev
  ```

The application will be running at `http://localhost:3000`.

## Project Structure

```
invoice_app/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.ts
├── package.json
├── tsconfig.json
└── nodemon.json
```

- `controllers/`: Handles the business logic for invoice operations.
- `models/`: Defines data models and schema.
- `routes/`: Contains API endpoints.
- `index.ts`: Main entry point of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is licensed under the [MIT License](LICENSE).
