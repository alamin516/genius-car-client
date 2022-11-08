import React from 'react';

const BannerItems = ({slide}) => {
    const {image, id, pre, next} = slide;
    return (
        <div id={`slide${id}`}className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={image} className="max-w-full bg-blend-difference" alt='' />
                </div>
                <div className="absolute  transform -translate-y-1/2 left-24 bottom-0 top-1/2 w-2/5">
                    <h1 className='text-6xl font-semibold text-white'>
                        Affordable <br />
                        Price For Car <br />
                        Servicing
                    </h1>
                    <div className='mt-8'>
                        <p className='text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                    </div>

                    <div className='mt-8'>
                        <button className="btn btn-warning mr-5">Discover More</button>
                        <button className="btn btn-outline text-white outline-white">Latest Project</button>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href={`#slide${pre}`} className="btn btn-circle mr-5">❮</a>
                    <a href={`#slide${next}`} className="btn btn-circle btn-danger">❯</a>
                </div>
            </div>
    );
};

export default BannerItems;