import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Alien } from 'phosphor-react'
import "./navBar.css"

function Navbar() {
  return (
    <div className='navbar'>
        <div className='links'>
            <Link to='/home'>Home</Link>
            <Link to='/cart'> <ShoppingCart size={32}></ShoppingCart> </Link>
            <Link to='/profile'> <Alien size={32}></Alien> </Link>
        </div>

    </div>
  )
}

export default Navbar