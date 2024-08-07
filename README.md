# News Aggregator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## News API Integration

This application uses the following APIs to fetch news articles:

- **NewsAPI.org**: Retrieves articles from thousands of sources including news publications and blogs, with filters for keywords, categories, and sources.

- **The Guardian**: Provides articles from The Guardian newspaper, supporting category-based browsing and keyword search.

- **New York Times**: Access detailed articles from The New York Times, with support for category and keyword filtering.

### Features and Requirements

1. **Article Search and Filtering**: Users can search for articles by keywords and filter the results by date, category, and source.

2. **Personalized News Feed**: Users can customize their news feed by selecting their preferred sources, categories, and authors.

3. **Mobile-Responsive Design**: The website is optimized for viewing on mobile devices, ensuring a seamless user experience across all platforms.

## Setup and Running the Application

To get started with the application, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pedrotmr/news-aggregator.git
   
   cd news-aggregator
   ```

2. **Build the Docker containers:**

   ```bash
   docker-compose build
   ```

3. **Start the application:**
   ```bash
   docker-compose up
   ```

## Running Prettier in Docker Container

To run Prettier to format your code, follow these steps:

1. **Access the web container's shell:**

   ```bash
   docker-compose exec web sh
   ```

2. **Run Prettier:**
   ```bash
   npm run prettier
   ```
