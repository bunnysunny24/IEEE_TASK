# GitHub Trending Repositories Web App

A responsive web application built using React that displays a list of trending GitHub repositories based on the number of stars. It includes pagination and search functionality.

## Features

- Fetches the trending repositories from the GitHub API.
- Search repositories by name.
- Paginated view for easy navigation.

## Technologies

- React
- Axios (for API requests)
- React Paginate (for pagination)

## Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

- [Download Node.js](https://nodejs.org/)

You can check if you have them installed by running:

```bash
node -v
npm -v
```

## Installation

1. **Clone the repository**

   Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/yourusername/github-trending.git
   ```

2. **Navigate to the project directory**

   Move to the project folder:

   ```bash
   cd github-trending
   ```

3. **Install dependencies**

   Install the required dependencies listed in `package.json`:

   ```bash
   npm install
   ```

## Usage

1. **Start the development server**

   Start the application locally by running the following command:

   ```bash
   npm start
   ```

   This will start a development server. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

2. **Build the project (for production)**

   If you'd like to create a production build:

   ```bash
   npm run build
   ```

   This will create an optimized build of the project in the `build` folder, ready for deployment.

## Deployment

You can view the deployed application here: [GitHub Trending Repositories](https://ieeetask-99.vercel.app/)

## Folder Structure

```
github-trending/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── TrendingRepos.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
├── package.json
├── node_modules/
└── README.md
```

## API Used

- **GitHub REST API**: The application fetches data from the GitHub API to display trending repositories.

## Notes

- The GitHub API rate limits unauthenticated requests. If you encounter rate limit errors, consider using GitHub authentication tokens.

## Contributing

Contributions are welcome! Feel free to open a pull request.

---

### Running Steps Summary:

1. Clone the repo: `git clone https://github.com/yourusername/github-trending.git`
2. Navigate to the folder: `cd github-trending`
3. Install dependencies: `npm install`
4. Start the app: `npm start`
5. Visit the app in your browser: [http://localhost:3000](http://localhost:3000)
