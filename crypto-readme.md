# Cryptocurrency Price Tracking API

A Node.js application that tracks real-time prices of Bitcoin, Ethereum, and Matic using the CoinGecko API. The application stores historical price data and provides endpoints to fetch latest statistics and price deviations.

## 🚀 Features

- Background job to fetch cryptocurrency prices every 2 hours
- REST API endpoints for retrieving latest crypto statistics
- Standard deviation calculation for price volatility analysis
- MongoDB integration for data persistence
- Error handling and input validation
- Production-ready code structure

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Node-cron (for scheduled jobs)
- Axios (for API requests)

## 📝 API Endpoints

### Get Latest Cryptocurrency Stats
```
GET /stats?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Standard Deviation
```
GET /deviation?coin=bitcoin
```
Query Parameters:
- `coin`: One of `bitcoin`, `matic-network`, or `ethereum`

Response:
```json
{
    "deviation": 4082.48
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone git@github.com:satyadev2/KoinX.git
cd KoinX
```

2. Install dependencies
```bash
npm i
```

3. Create a `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
```

4. Start the server
```bash
npm start
```

For development with nodemon:
```bash
npm run dev
```




## 📊 Data Flow

1. A cron job runs every 2 hours to fetch current prices from CoinGecko
2. Price data is stored in MongoDB with timestamp
3. APIs fetch and process this data as requested
4. Standard deviation calculations use the last 100 price points

## 🔒 Error Handling

- Input validation for coin parameters
- Error handling for API failures
- Database connection error handling
- Rate limiting for API endpoints

