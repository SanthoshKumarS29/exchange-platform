import React, { useEffect, useRef, useState } from 'react'
import {
    createChart,
    CandlestickSeries,
    ColorType,
} from 'lightweight-charts';

import './styles/TradingChart.css';

const TradingChart = ({ price }) => {

    const generateCandles = (baseprice, count) => {
        let perviouseClose = baseprice * 0.985;
        const candles = [];
        const now = Math.floor(Date.now() / 1000);

        for (let index = count - 1; index >= 0; index--) {
            const open = perviouseClose;
            const movement = (Math.random() - 0.48) * baseprice * 0.012;
            const close = Math.max(0.000001, open + movement);

            const high = Math.max(open, close) + Math.random() * baseprice * 0.003;
            const low = Math.max(0.000001, Math.min(open, close) - Math.random() * baseprice * 0.003);

            perviouseClose = close;
            candles.push({ open, high, low, close, time: now - index * 3600 });
        }
        return candles;
    }

    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const candleSeriesRef = useRef(null);

    const [interval, setInterval] = useState('1h');

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 380,

            layout: {
                background: {
                    type: ColorType.Solid,
                    color: '#111827',
                },
                textColor: '#D1D5DB',
            },

            grid: {
                vertLines: { color: '#1f2937' },
                horzLines: { color: '#1f2937' },
            },

            rightPriceScale: {
                borderColor: '#374151',
            },

            timeScale: {
                borderColor: '#374151',
                timeVisible: true,
                secondsVisible: false,
            }
        })

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#16a34a',
            downColor: '#dc2626',
            borderUpColor: '#16a34a',
            borderDownColor: '#dc2626',
            wickUpColor: '#16a34a',
            wickDownColor: '#dc2626',
        });

        chartRef.current = chart;
        candleSeriesRef.current = candleSeries;

        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries.length) return;

            const { width } = entries[0].contentRect;

            chart.applyOptions({ width });
        })
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();

            chartRef.current = null;
            candleSeriesRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!candleSeriesRef.current) return;

        const count = interval === '1m' ? 30 : interval === '5m' ? 36 : interval === '15m' ? 40 : interval === '1h' ? 40 : interval === '4h' ? 40 : 40;

        const candles = generateCandles(Number(price), count);

        candleSeriesRef.current.setData(candles);

        chartRef.current.timeScale().fitContent();
    }, [interval, price]);

    const intervals = ['1m', '5m', '15m', '1h', '4h', '1d'];


    return (
        <div className="trading-chart">
            <div className="chart-toolbar">
                <h3>Price Chart</h3>

                <div className="chart-intervals">
                    {intervals.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={interval === item ? 'active' : ''}
                            onClick={() => setInterval(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div
                ref={chartContainerRef}
                className="chart-container"
            />

            <p className="chart-note">
                Demo historical data · Not live market prices
            </p>
        </div>

    )
}

export default TradingChart