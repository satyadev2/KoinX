const { default: axios } = require('axios');
const express = require('express')
const statsRouter = express.Router();

statsRouter.get("/stats",async (req, res) =>
{
    try {
        const coin = req.query.coin;
        const allowedCoins = ["bitcoin", "ethereum", "matic-network"];
        if (allowedCoins.includes(coin)==false)
        {
            throw new Error("Please check your query parameter, it must be either of these -bitcoin, ethereum, matic-network");
        }
        const currentData = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
                params: {
                    ids: coin, 
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                }
            }
        );
        const coinData = currentData.data[coin];
        const transformedData = {
            price: coinData.usd,           
            marketCap: coinData.usd_market_cap,  
            "24hChange": coinData.usd_24h_change, 
        };

        if (currentData == null)
        {
            throw new Error("Unable to fetch data");
        }

       res.json(transformedData);
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
})

module.exports = statsRouter;