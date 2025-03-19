import { useContext, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import { CartContext } from "../store/cart-context"
import { currencyFormatter } from "../util/formatting"

export default function CartModal({ref,checkout}){
    const dialog=useRef()
    const {selectedMeals:meals,changeQuantity,total}= useContext(CartContext)

    useImperativeHandle(ref,()=>{
        return{
            open() {
                dialog.current.showModal()
            }
        }
    })

    const isEmpty= total===0

    

    return createPortal(
        (<dialog className="cart modal" ref={dialog} >
            <h2>Your Cart</h2>
            {isEmpty&&<p style={{textAlign:'center'}}>The cart is Empty</p>}
            <ul>
                {meals.map((meal)=>{
                    return <li key={meal.id} className="cart-item">
                        <p>{meal.name} - {meal.quantity} x {currencyFormatter.format(meal.price)}</p>
                        <div className="cart-item-actions">
                            <button onClick={()=>changeQuantity(meal.id,'decrement')}>-</button>
                            <span>{meal.quantity}</span>
                            <button onClick={()=>changeQuantity(meal.id,'increment')}>+</button>
                        </div>
                        </li>
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(total)}</p>
            <form className="modal-actions" method="dialog">
                <button className="text-button">Close</button>
                <button className="button" onClick={checkout} disabled={isEmpty} >Go to Checkout</button>
            </form>
        </dialog>), document.getElementById('modal')
    )
}