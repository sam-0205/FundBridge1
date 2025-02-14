import React from 'react'

const Footer = () => {

  const cy = new Date().getFullYear();
  return (
    <footer className='bg-gray-700 text-white text-center px-2 py-4'>
        <p>copyrights © {cy} FundBridge - All rights reserved!</p>        
    </footer>
  )
}

export default Footer
