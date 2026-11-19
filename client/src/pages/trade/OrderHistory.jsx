import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders } from '../../features/order/OrderSlice';

const OrderHistory = () => {

    const dispatch = useDispatch();

    const { items, fetchStatus, error } = useSelector(
        (state) => state.orders
    )

    useEffect(() => {
        if(fetchStatus === 'idle'){
            dispatch(fetchMyOrders());
        }
    }, [dispatch, fetchMyOrders]);

    if (fetchStatus === 'loading') {
        return <p>Loading your orders...</p>;
    }

    if (fetchStatus === 'failed') {
        return <p className="order-error">{error}</p>;
    }

  return (
    <section className="order-history">
            <h3>My Orders</h3>

            {items.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="order-history-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Market</th>
                                <th>Side</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.symbol}</td>

                                    <td className={order.side}>
                                        {order.side.toUpperCase()}
                                    </td>

                                    <td>{order.orderType}</td>

                                    <td>
                                        {Number(order.price).toLocaleString()}
                                    </td>

                                    <td>{order.quantity}</td>

                                    <td>
                                        {Number(order.total).toLocaleString()}
                                        {' '}{order.quoteAsset}
                                    </td>

                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
  )
}

export default OrderHistory