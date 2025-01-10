const deviationRouter = require("express").Router();
const CoinPriceModel = require("../Model/CryptoDetails");


function calculateStandardDeviation(prices) {
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    return Math.sqrt(variance);
}

deviationRouter.get("/deviation", async (req, res) => {
    try {
        const coin = req.query.coin;

        if (!coin) {
            return res.status(400).send("Please provide a valid coin in the query params.");
        }
        const records = await CoinPriceModel.find({ name: coin }); 
        if (records.length < 100) {
            return res.status(404).send("Not enough data is provided!");
        }
        const prices = records.map(record => record.price_usd);
        const deviation = calculateStandardDeviation(prices);
        res.json({ deviation: deviation.toFixed(2) });

    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

module.exports = deviationRouter;
