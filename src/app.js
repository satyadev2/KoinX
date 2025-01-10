require('dotenv').config();
const express = require('express');
const app = express();
const statsRouter = require('../router/statsRouter');
const deviationRouter = require('../router/deviationRouter');
const dbconnection = require("../config/dbConnection")
const { fetchCryptoData, saveCryptoData } = require('../utils/currencyStats');
const cron = require("node-cron");



app.use(express.json());
app.use('/', statsRouter);
app.use('/', deviationRouter);
app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Crypto Price API Documentation</title>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                        </head>
                        <body class="bg-gray-100">
                            <div class="min-h-screen">
                                <!-- Header -->
                                <header class="bg-blue-600 text-white py-12">
                                    <div class="container mx-auto px-4">
                                        <h1 class="text-4xl font-bold mb-4">Crypto Price API</h1>
                                        <p class="text-xl">Real-time cryptocurrency price statistics and deviation analysis</p>
                                    </div>
                                </header>

                                <!-- Main Content -->
                                <main class="container mx-auto px-4 py-8">
                                    <!-- Supported Coins -->
                                    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
                                        <h2 class="text-2xl font-bold mb-4">Supported Cryptocurrencies</h2>
                                        <div class="grid md:grid-cols-3 gap-4">
                                            <div class="p-4 bg-gray-50 rounded-lg">
                                                <h3 class="font-bold">Bitcoin</h3>
                                                <p class="text-gray-600">Parameter: bitcoin</p>
                                            </div>
                                            <div class="p-4 bg-gray-50 rounded-lg">
                                                <h3 class="font-bold">Ethereum</h3>
                                                <p class="text-gray-600">Parameter: ethereum</p>
                                            </div>
                                            <div class="p-4 bg-gray-50 rounded-lg">
                                                <h3 class="font-bold">Matic</h3>
                                                <p class="text-gray-600">Parameter: matic-network</p>
                                            </div>
                                        </div>
                                    </section>

                                    <!-- API Endpoints -->
                                    <section class="bg-white rounded-lg shadow-md p-6">
                                        <h2 class="text-2xl font-bold mb-6">API Endpoints</h2>

                                        <!-- Stats Endpoint -->
                                        <div class="mb-8 p-6 bg-gray-50 rounded-lg">
                                            <h3 class="text-xl font-bold mb-2">Get Latest Statistics</h3>
                                            <p class="mb-4 text-gray-600">Fetch current price, market cap, and 24h change for a cryptocurrency (in USD).</p>

                                            <div class="bg-gray-100 p-4 rounded-md mb-4">
                                                <code class="text-blue-600">GET /stats?coin={coinParameter}</code>
                                            </div>

                                            <div class="mb-4">
                                                <h4 class="font-bold mb-2">Example Request:</h4>
                                                <div class="bg-gray-100 p-4 rounded-md">
                                                    <code>https://koinxbackenddemo.vercel.app/stats?coin=bitcoin</code>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 class="font-bold mb-2">Sample Response:</h4>
                                                <pre class="bg-gray-100 p-4 rounded-md">
                                                    {
                                                        "price": 40000,
                                                    "marketCap": 800000000,
                                                    "24hChange": 3.4
}</pre>
                                            </div>
                                        </div>

                                        <!-- Deviation Endpoint -->
                                        <div class="p-6 bg-gray-50 rounded-lg">
                                            <h3 class="text-xl font-bold mb-2">Get Price Deviation</h3>
                                            <p class="mb-4 text-gray-600">Calculate standard deviation of price for the last 100 records.</p>

                                            <div class="bg-gray-100 p-4 rounded-md mb-4">
                                                <code class="text-blue-600">GET /deviation?coin={coinParameter}</code>
                                            </div>

                                            <div class="mb-4">
                                                <h4 class="font-bold mb-2">Example Request:</h4>
                                                <div class="bg-gray-100 p-4 rounded-md">
                                                    <code>https://koinxbackenddemo.vercel.app/deviation?coin=bitcoin</code>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 class="font-bold mb-2">Sample Response:</h4>
                                                <pre class="bg-gray-100 p-4 rounded-md">
                                                    {
                                                        "deviation": 4082.48
}</pre>
                                            </div>
                                        </div>
                                    </section>
                                </main>

                                <!-- Footer -->
                                <footer class="bg-gray-800 text-white py-8 mt-12">
                                    <div class="container mx-auto px-4 text-center">
                                        <p>Created by Satyadev Kushwaha</p>
                                    </div>
                                </footer>
                            </div>
                        </body>
                    </html>`)
});

cron.schedule("0 */2 * * *", async () => {
    console.log("Running scheduled job: Fetching and saving cryptocurrency data...");
    try {
        const cryptoData = await fetchCryptoData();
        if (cryptoData) {
            await saveCryptoData(cryptoData);
            console.log("Data successfully saved to the database.");
        } else {
            console.log("No data fetched.");
        }
    } catch (err) {
        console.error("Error in scheduled job:", err.message);
    }
});


dbconnection()
    .then(() => {
        console.log("DB connection successful");

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening `);
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected:", err.message);
    });







