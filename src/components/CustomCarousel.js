import React from 'react'
import { Carousel } from "react-bootstrap"

import carrusel1 from "../assets/para_banner1.png"
import carrusel2 from "../assets/img02.jpg"
import carrusel3 from "../assets/img04.jpg"
import carrusel4 from "../assets/img10.jpg"


export default function CustomCarousel() {
  return (
    <Carousel variant="dark">
        <Carousel.Item interval={1500}>
          <center>
          <img 
            
            className="d-block w-70"
            src={carrusel1}
            alt="First slide"
          />
          </center>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item interval={1500}>
          <center>
          <img
            className="d-block w-70"
            src={carrusel2}
            alt="First slide"
          />
          </center>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
        <center>
          <img
            className="d-block w-70 "
            src={carrusel3}
            alt="First slide"
          />
          </center>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={1500}>
        <center>
          <img
            className="d-block w-70 "
            src={carrusel4}
            alt="First slide"
          />
          </center>
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>

        </Carousel>
  )

  
}

