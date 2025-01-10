const axios = require("axios");
const Crypto = require("../Model/CryptoDetails"); // Your Mongoose model
// const Crypto = require("./models/Crypto"); // Adjust the path as per your file structure

async function fetchCryptoData() {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/simple/price",
            {
                params: {
                    ids: "bitcoin,matic-network,ethereum", // 'polygon' is the new name for 'matic'
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                }
            }
        );

        const data = response.data;
        console.log(data);
        return [
            {
                name: "bitcoin",
                price_usd: data.bitcoin.usd,
                market_cap_usd: data.bitcoin.usd_market_cap,
                change_24h: data.bitcoin.usd_24h_change
            },
            {
                name: "matic-network",
                price_usd: data['matic-network'].usd, // Correct key for matic-network
                market_cap_usd: data['matic-network'].usd_market_cap,
                change_24h: data['matic-network'].usd_24h_change
            },
            {
                name: "ethereum",
                price_usd: data.ethereum.usd,
                market_cap_usd: data.ethereum.usd_market_cap,
                change_24h: data.ethereum.usd_24h_change
            }
        ];
         
    } catch (error) {
        console.error("Error fetching cryptocurrency data:", error.message);
        return [];
    }
}


// Save data to the database
const saveCryptoData = async (data) => {
    try {
        await Crypto.insertMany(data); // Adjust according to your schema
        console.log("Data saved to the database.");
    } catch (err) {
        console.error("Error saving crypto data:", err.message);
    }
};


module.exports = { fetchCryptoData, saveCryptoData };

