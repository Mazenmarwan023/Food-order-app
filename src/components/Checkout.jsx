import { useActionState, useContext, useState } from "react"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CartContext } from "../store/cart-context"
import { currencyFormatter } from "../util/formatting"
import Input from "./Input"
import { postOrders } from "../http"
import ErrorPage from "./Error"



export default function Checkout({open , checkout}){
    const {total,selectedMeals,clearCart}= useContext(CartContext)
    const dialog=useRef()
    const [error,setError]=useState()
    const [formState,formAction,pending]=useActionState(submitAction,{errors:null})
    const [success,setSuccess]=useState(false)



    useEffect(()=>{
        if(open){
            dialog.current.showModal()
        }else{
            dialog.current.close()
        }
    },[open])
    

    async function submitAction(prevFormState,formData){
        const name=formData.get('name')
        const email=formData.get('email')
        const street=formData.get('street')
        const code=formData.get('postal-code')
        const city=formData.get('city')
    
    
        const errors=[]
    
        if(!name){
            errors.push("Please enter a valid Name.")
        }
        if(!email.includes("@")){
            errors.push("Please enter a valid Email.")
        }
        if(code.length < 6){
            errors.push("Invalid Postal code.")
        }
    
        if(errors.length !==0){
            return {
                errors:errors,
            }
    
        }
        const order={
            items:selectedMeals,
            customer:{name,email,street,['postal-code']:code,city}
        }
        console.log(order)

        try{
            await postOrders(order)
            setSuccess(true)
        }catch(error){
            setError(error)
        }
    
        return {
            errors:null,
        }
    
    }

    function finish(){
        checkout()
        clearCart()
        setSuccess(false)
    }

    let actions=(
        <>
        <button className="text-button" type="button" onClick={checkout}>Close</button>
        <button className="button">Submit Order</button>
        </>
    )

    if(pending){
        actions=(
            <span>Submitting order.....</span>
        )
    }

    if(success){
        return createPortal(
            <dialog className="modal" onClose={finish}>
                <h2>Success!</h2>
                <p>Your order was submmitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <form className="modal-actions" method="dialog">
                    <button className="button" onClick={finish}>Okay</button>
                </form>
            </dialog>,document.getElementById('modal')
        )
    }

    

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={checkout}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(total)}</p>
            <form action={formAction}>
                <Input label="Full Name" name="name" type="text" id="full-name" />
                <Input label="Email address" name="email" id="email"/>
                <Input label="Street" name="street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" name="postal-code" type="text" id="postal-code" />
                    <Input label="City" name="city" type="text" id="city"/>
                </div>
                {formState.errors && <ul>{formState.errors.map((error)=>{
                    return <li key={error}>{error}</li>
                    })}</ul>}
                {error && <ErrorPage message="Failed to submit error" />}
                <div className="modal-actions">{actions}</div>
            </form>
        </dialog>,document.getElementById('modal')
    )
}