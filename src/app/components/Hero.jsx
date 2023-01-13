import React from 'react'
import bgClothes from '/images/clothes.jpg'
import bgLaptops from '/images/laptops.jpg'
import bgGrocery from '/images/grocery.jpg'
export default function Hero() {
  return (
    <div className="mb-20 ">
        <div style={{backgroundImage :`url(${bgClothes})`}} className="slide absolute bg-cover bg-no-repeat">
          <div className="content z-20"></div>
        </div>
    </div>
  )
}
