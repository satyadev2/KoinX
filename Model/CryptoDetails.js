const mongoose = require("mongoose");

const cryptoPriceDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price_usd: { type: Number, required: true },
    market_cap_usd: { type: Number, required: true },
    change_24h: { type: Number, required: true },
    fetched_at: { type: Date, default: Date.now }
},{
    timestamps: true,
    index: {
        coinId: 1,
        timestamp: -1
    }
});
cryptoPriceDataSchema.index({name:1,fetched_at:-1})

const Crypto = mongoose.model("CryptoPriceData", cryptoPriceDataSchema);

module.exports = Crypto;
