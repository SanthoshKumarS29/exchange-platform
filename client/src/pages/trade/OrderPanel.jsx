import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles/Order.css'
import { clearOrderMessages, createOrder } from '../../features/order/OrderSlice';

const OrderPanel = ({ market, currentPrice }) => {
    const dispatch = useDispatch();
    const { createStatus, error, successMessage } = useSelector(
        (state) => state.orders
    )


    const [side, setSide] = useState('buy');
    const [orderType, setOrderType] = useState('market');
    const [price, setPrice] = useState(currentPrice);
    const [quantity, setQuantity] = useState('');

    const orderPrice = orderType === 'market' ? Number(currentPrice) : Number(price);

    const total = orderPrice * Number(quantity || 0);

    const isSubmitting = createStatus === 'loading';

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(clearOrderMessages())

        if (!quantity || !Number.isFinite(Number(quantity)) ||
            Number(quantity) <= 0) {
            return;
        }

        if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
            return;
        }

        const orderData = {
            marketId: market.id,
            symbol: market.symbol,
            baseAsset: market.baseAsset,
            quoteAsset: market.quoteAsset,
            side,
            orderType,
            price: orderPrice,
            quantity: Number(quantity)
        }

        try{
            await dispatch(createOrder(orderData)).unwrap();
            setQuantity('');
        } catch(error){
            console.error('Order submission failed', error);
        }

    }

  return (
    <div className="order-panel">

            <h3>Place Order</h3>

            {/* Buy / Sell selection */}
            <div className="order-side">
                <button
                    type="button"
                    className={side === 'buy' ? 'active buy' : ''}
                    onClick={() => setSide('buy')}
                >
                    Buy
                </button>

                <button
                    type="button"
                    className={side === 'sell' ? 'active sell' : ''}
                    onClick={() => setSide('sell')}
                >
                    Sell
                </button>
            </div>

            {/* Order type */}
            <div className="order-type">
                <button
                    type="button"
                    className={orderType === 'market' ? 'active' : ''}
                    onClick={() => setOrderType('market')}
                >
                    Market
                </button>

                <button
                    type="button"
                    className={orderType === 'limit' ? 'active' : ''}
                    onClick={() => {
                        setPrice(String(currentPrice));
                        setOrderType('limit');
                    }}
                >
                    Limit
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Price input */}
                {orderType === 'limit' ? (
                    <div className="form-group">
                        <label>
                            Price ({market.quoteAsset})
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="any"
                            value={price}
                            onChange={(event) =>
                                setPrice(event.target.value)
                            }
                            placeholder="Enter price"
                        />
                    </div>
                ) : (
                    <div className="market-price">
                        <span>Market Price</span>
                        <strong>
                            {currentPrice.toLocaleString()}
                            {' '}{market.quoteAsset}
                        </strong>
                    </div>
                )}

                {/* Quantity input */}
                <div className="form-group">
                    <label>
                        Quantity ({market.baseAsset})
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="any"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(event.target.value)
                        }
                        placeholder="Enter quantity"
                    />
                </div>

                {/* Total */}
                <div className="order-total">
                    <span>Total</span>

                    <strong>
                        {total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                        })} {market.quoteAsset}
                    </strong>
                </div>

                {/* Error message */}
                {error && (
                    <p className="order-error">{error}</p>
                )}

                {/* Success message */}
                {successMessage && (
                    <p className="order-success">{successMessage}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className={`submit-order ${side}`}
                >
                    {isSubmitting
                        ? 'Placing Order...'
                        : `${side === 'buy' ? 'Buy' : 'Sell'} ${market.baseAsset}`}
                </button>

            </form>
        </div>
  )
}

export default OrderPanel
