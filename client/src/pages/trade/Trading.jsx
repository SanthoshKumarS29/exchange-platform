import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { loadMarkets } from '../../features/market/marketSlice';
import TradingChart from './TradingChart';
import OrderPanel from './OrderPanel';

const Trading = () => {

    const { pair } = useParams();
    const dispatch = useDispatch();

    const { items, status, error } = useSelector(
        (state) => state.markets
    )

    useEffect(() => {
        if (status === 'idle') {
            dispatch(loadMarkets());
        }
    }, [status, dispatch])

    const market = items.find(
        (item) => item.id === pair
    )

    if (status === 'loading' || status === 'idle') {
        return <p>Loading Market ...</p>
    }

    if (status === 'failed') {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => dispatch(loadMarkets())}>
                    Try again
                </button>
            </div>
        )
    }

    if (!market) {
        return (
            <div>
                <h2>Market not found</h2>
                <Link to="/exchange">Back to markets</Link>
            </div>
        )
    }

    const price = Number(market.price);

    return (
        <main className="trading-page">
            <Link to="/markets">← Back to markets</Link>

            <header className="trading-header">
                <h1>{market.symbol}</h1>
                <p>{market.name}</p>

                <h2>
                    {price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 8,
                    })}{' '}
                    {market.quoteAsset}
                </h2>

                <p
                    style={{
                        color: market.change24h >= 0 ? 'green' : 'red',
                    }}
                >
                    24h Change: {market.change24h}%
                </p>
            </header>

            <section className="trading-layout">
                <TradingChart price={price} />

                <OrderPanel market={market} currentPrice={price} />
            </section>

            <section className="trading-panel">
                <h3>Orders and Trade History</h3>
                <p>
                    Open Orders | Order History | Trade History | Balances
                </p>
                <p>These tables will be implemented in a later step.</p>
            </section>
        </main>
    )
}

export default Trading