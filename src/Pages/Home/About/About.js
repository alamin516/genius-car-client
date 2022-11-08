import React from 'react';
import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'

const About = () => {
    return (
        <div className="hero my-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-1/2 w-12/12 relative'>
                    <img src={person} alt='' className="w-4/5 rounded-lg" />
                    <img src={parts} alt='' className="w-3/5 rounded-lg absolute right-5 top-1/2 border-8 border-white" />
                </div>
                <div className='lg:w-1/2 w-12/12'>
                    <h2 className='text-2xl font-bold text-orange-400 mb-5'>About Us</h2>
                    <h1 className="text-5xl font-bold">We are qualified <br/> & of experience <br/> in this field</h1>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>

                    <button className="btn border-0 bg-orange-600 mt-8">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default About;