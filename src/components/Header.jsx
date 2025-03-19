import { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { CartContext } from '../store/cart-context'

export default function Header({cartClick}){
    const {quantity}= useContext(CartContext)
    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='logo-image'/>
                <h1>React Food</h1>
            </div>
            <button className='text-button' onClick={cartClick}>Cart ({quantity})</button>
        </header>
    )
}