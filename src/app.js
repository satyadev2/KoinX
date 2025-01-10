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
app.use("/", (req, res) =>
{
    res.send("hello world");
})

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







