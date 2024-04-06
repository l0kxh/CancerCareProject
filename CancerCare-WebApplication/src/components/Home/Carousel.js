import React from 'react'
import './Carousel.css'
import c1 from '../../Assests/c1.jpeg'
import c2 from '../../Assests/c2.png'
import c3 from '../../Assests/c3.png'
import c4 from '../../Assests/c4.jpg'
import c5 from '../../Assests/c5.jpg'
import c6 from '../../Assests/c6.jpg'
import c7 from '../../Assests/c7.jpg'
function Carousel() {
    return (
        <div className='imagecarousel mb-5'>
            <div id="carouselExampleRide" className="carousel carousel-dark slide" data-bs-ride="true">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={c7} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c2} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c3} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c4} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c5} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c6} className="d-block w-100 cimage" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={c1} className="d-block w-100 cimage" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                    <div className="carousel-control-prev-icon"></div>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
