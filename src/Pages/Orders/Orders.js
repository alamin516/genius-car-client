import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://genius-car-server-rho-six.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization : `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    return logOut()
                }
                return res.json()
            })
            .then(data => {
                setOrders(data)
            })
    }, [user?.email, logOut])


    const handleDelete = id => {
        const procced = window.confirm('Are you sure, you want to delete')
        if (procced) {
            fetch(`https://genius-car-server-rho-six.vercel.app/orders/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Delete sucessfully')
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining)
                    }
                })
        }
    }

    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-rho-six.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })

        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id)
                    approving.status = 'Approved'
                    const newOrders = [approving, remaining];
                    setOrders(newOrders)
                }
            })
    }

    return (
        <div className='my-10'>
            <h2 className='text-3xl mb-2'>You have total: {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {
                                orders.map(order => <OrderRow
                                    key={order._id}
                                    order={order}
                                    handleDelete={handleDelete}
                                    handleStatusUpdate={handleStatusUpdate}
                                >
                                </OrderRow>)
                            }
                        </>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;