import {useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMarkets } from '../../features/market/marketSlice';


const formatPrice = (price) => new Intl.NumberFormat('en-us', {
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 4 : 2
}).format(price)

const formatVolume =(volume) => new Intl.NumberFormat('en-us', {
    notation: 'compact',
    maximumFractionDigits: 2
}).format(volume);

const MarketList = () => {
    const dispatch = useDispatch();

    const { items, status, error} = useSelector(
        (state) => state.markets
    );

    const [search, setSearch] = useState('')
    const [selectedMarket, setSelectedMarket] = useState(null);

    useEffect(() => {
        if(status === 'idle'){
            dispatch(loadMarkets())
        }
    }, [dispatch, status]);

    const filteredMarkets = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();

        if(!query) return items;

        return items.filter((market) => 
            `${market.symbol} ${market.name} ${market.baseAsset} ${market.quoteAsset}`
                .toLowerCase()
                .includes(query)
        )
    }, [items, search])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Exchange Markets
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Explore available trading pairs
                        </p>
                    </div>

                    <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                        Demo data
                    </span>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Spot Markets
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Prices are simulated and are not live quotes.
                        </p>
                    </div>

                    <input
                        type="search"
                        aria-label="Search markets"
                        placeholder="Search a coin or pair..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:max-w-xs"
                    />
                </div>

                {status === 'loading' && (
                    <div
                        role="status"
                        className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-300"
                    >
                        Loading markets...
                    </div>
                )}

                {status === 'failed' && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-800 bg-red-950/40 p-6"
                    >
                        <p className="text-red-300">{error}</p>

                        <button
                            onClick={() => dispatch(loadMarkets())}
                            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-600"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {status === 'succeeded' && (
                    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase tracking-wide text-slate-400">
                                <tr>
                                    <th className="px-5 py-4">Asset</th>
                                    <th className="px-5 py-4 text-right">
                                        Last price (USDT)
                                    </th>
                                    <th className="px-5 py-4 text-right">
                                        24h change
                                    </th>
                                    <th className="px-5 py-4 text-right">
                                        24h volume (USDT)
                                    </th>
                                    <th className="px-5 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800">
                                {filteredMarkets.map((market) => {
                                    const isPositive = market.change24h >= 0;
                                    const isSelected =
                                        selectedMarket?.id === market.id;

                                    return (
                                        <tr
                                            key={market.id}
                                            className={
                                                isSelected
                                                    ? 'bg-blue-950/40'
                                                    : 'transition hover:bg-slate-800/60'
                                            }
                                        >
                                            <td className="px-5 py-4">
                                                <div className="font-semibold text-white">
                                                    {market.symbol}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-400">
                                                    {market.name}
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-right font-medium tabular-nums">
                                                {formatPrice(market.price)}
                                            </td>

                                            <td
                                                className={`px-5 py-4 text-right font-semibold tabular-nums ${
                                                    isPositive
                                                        ? 'text-emerald-400'
                                                        : 'text-red-400'
                                                }`}
                                            >
                                                {isPositive ? '+' : ''}
                                                {market.change24h.toFixed(2)}%
                                            </td>

                                            <td className="px-5 py-4 text-right text-slate-300 tabular-nums">
                                                {formatVolume(market.volume24h)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        setSelectedMarket(market)
                                                    }
                                                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                                                >
                                                    {isSelected
                                                        ? 'Selected'
                                                        : 'Select'}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filteredMarkets.length === 0 && (
                            <p className="p-8 text-center text-slate-400">
                                No markets match your search.
                            </p>
                        )}
                    </div>
                )}

                {selectedMarket && (
                    <div className="mt-6 rounded-xl border border-blue-800 bg-blue-950/30 p-5">
                        <p className="text-sm text-blue-300">
                            Selected trading pair
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                            {selectedMarket.symbol}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            The dedicated Trading page will be added next.
                        </p>
                    </div>
                )}
            </section>
        </main>

  )
}

export default MarketList