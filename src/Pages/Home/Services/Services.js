import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://genius-car-server-rho-six.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])

    return (
        <div className='my-20'>
            <div className='text-center mb-10'>
                <h2 className='text-2xl text-orange-600'>Services</h2>
                <h1 className='text-5xl text-dark font-bold my-5'>Our Service Area</h1>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br/> words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map(service => <ServicesCard
                    key={service._id}
                    service={service}
                    >
                    </ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;