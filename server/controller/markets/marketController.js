const markets = [
    {
        id: 'BTC-USDT',
        baseAsset: 'BTC',
        quoteAsset: 'USDT',
        symbol: 'BTC/USDT',
        name: 'Bitcoin',
        price: 67250.00,
        change24h: 2.45,
        volume24h: 1250000000,
    },
    {
        id: 'ETH-USDT',
        baseAsset: 'ETH',
        quoteAsset: 'USDT',
        symbol: 'ETH/USDT',
        name: 'Ethereum',
        price: 3450.50,
        change24h: 1.82,
        volume24h: 680000000,
    },
    {
        id: 'SOL-USDT',
        baseAsset: 'SOL',
        quoteAsset: 'USDT',
        symbol: 'SOL/USDT',
        name: 'Solana',
        price: 182.75,
        change24h: -0.68,
        volume24h: 245000000,
    },
    {
        id: 'BNB-USDT',
        baseAsset: 'BNB',
        quoteAsset: 'USDT',
        symbol: 'BNB/USDT',
        name: 'BNB',
        price: 598.20,
        change24h: 0.94,
        volume24h: 98000000,
    },
    {
        id: 'XRP-USDT',
        baseAsset: 'XRP',
        quoteAsset: 'USDT',
        symbol: 'XRP/USDT',
        name: 'XRP',
        price: 0.624,
        change24h: -1.25,
        volume24h: 76000000,
    },
    {
        id: 'ADA-USDT',
        baseAsset: 'ADA',
        quoteAsset: 'USDT',
        symbol: 'ADA/USDT',
        name: 'Cardano',
        price: 0.485,
        change24h: 0.73,
        volume24h: 42000000,
    },
];

export const getMarkets = (req, res) => {
    return res.status(200).json({
        success: true,
        count: markets.length,
        markets
    })
}