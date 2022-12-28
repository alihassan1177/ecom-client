import React from 'react'
import PropTypes from 'prop-types'

Modal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.any,
  title : PropTypes.string,
  children: PropTypes.any,
  message : PropTypes.string
}

export default function Modal({ show, message,title,setShow, children }) {
  
  if(show == true){
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflowY = "auto"
  }

  return (
    <>
      <div
        onClick={()=>setShow(false)}
        className={`${show ? 'block' : 'hidden'} absolute z-10 inset-0 bg-black opacity-70`}
      ></div>
      <div
        className={`${show ? 'block' : 'hidden'
          } absolute md:min-w-[500px] z-20 rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-8 px-10`}
      >
          <h3 className='font-semibold uppercase text-center text-xl'>{title}</h3>
        <p className='mb-6 text-gray-800 mx-auto text-center leading-tight text-md mt-1'>{message}</p>
        {children}
      </div>
    </>
  )
}
