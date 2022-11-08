import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { title, price, _id } = useLoaderData();
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        // if(phone.length > 0){
        //     alert('Phone number should be  10 mcharacters or longer')
        // }
        fetch('https://genius-car-server-rho-six.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.acknowledged === true){
                    alert("Checkout successfully done")
                }
            })
            .catch(err => console.error(err))

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl'>{title}</h2>
                <h4 className='text-3xl'>Price: {price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" className='input input-ghost w-full input-bordered' placeholder='First Name' />
                    <input name='lastName' type="text" className='input input-ghost w-full input-bordered' placeholder='Last Name' />
                    <input name='phone' type="text" className='input input-ghost w-full input-bordered' placeholder='Your Phone' required />
                    <input name='email' type="email" defaultValue={user?.email} className='input input-ghost w-full input-bordered' placeholder='Your Email' readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full my-4" placeholder='Your Message'></textarea>
                <input type="submit" className='btn my-2' value='Place Your Order' />
            </form>
        </div>
    );
};

export default Checkout;