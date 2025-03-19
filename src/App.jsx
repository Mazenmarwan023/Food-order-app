import { useRef, useState,useEffect, useContext } from "react";
import CartModal from "./components/CartModal";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ErrorPage from "./components/Error";
import { fetchAvailableFood } from "./http"
import CheckoutModal from "./components/Checkout";
import CartContextProvider from "./store/cart-context";

function App() {
  const cartModalRef=useRef()
  // const [selectedMeals,setSelectedMeals]=useState([])
  // const [meals,setMeals]=useState([])
  // const [isFetching,setIsFetching]=useState(false)
  // const [error,setError]=useState()

  const [openCheckout,setOpenCheckout]=useState(false)



  // async function fetchFood(){
  //     setIsFetching(true)
  //     try{
  //         const meals= await fetchAvailableFood() 
  //         console.log(meals)
  //         setMeals(meals)
  //     }catch(error){
  //         console.log(error)
  //         console.log(error.message)
  //         setError(error)
  //     }

  //     setIsFetching(false)
  // }

  // useEffect(()=>{
  //     fetchFood()
  // }
  // ,[])


  function openCartModal(){
    cartModalRef.current.open()
  }

  // function addItemToCart(selectedItem){
  //   setSelectedMeals(oldState =>{
  //     if(selectedMeals.some((meal)=>meal.id===selectedItem.id)){
  //       const newState=[...oldState.map((meal)=>{
  //         if(meal.id===selectedItem.id){
  //           const newMeal={...meal}
  //           newMeal.quantity+=1
  //           return newMeal
  //         }
  //         return meal
  //       })]
  //       return newState
  //           }

  //     return [...oldState,{id:selectedItem.id,name:selectedItem.name,price:selectedItem.price,quantity:1}]
  //   })
  // }

 

  // function changeQuantity(id,state){
  //   setSelectedMeals(oldState =>{            
  //     const newState=[...oldState.map((meal)=>{
  //       if(meal.id===id){
  //             const newMeal={...meal}
  //             if(state==='increment'){
  //             newMeal.quantity+=1
  //             }
  //             else{
  //               newMeal.quantity-=1
  //             }
  //             return newMeal
  //       }
  //       return meal

  //     })]

  //     return newState
  //         })

  //     setSelectedMeals(oldState=>{
  //       return [...oldState.filter((meal)=>meal.quantity>0)]
  //     })
  //   }
    

    // let quantity=0 // total quantity in cart
    // let total=0
    // selectedMeals.map((meal)=>{
    //   quantity+=meal.quantity
    //   total+=meal.quantity * +meal.price
    // })

    function handleCloseCheckoutModal(){
      setOpenCheckout(false)
    }

    function handleOpenCheckoutModal(){
      setOpenCheckout(true)
    }

  return (
    <CartContextProvider>
      <CheckoutModal /*total={total}*/ open={openCheckout} checkout={handleCloseCheckoutModal} />
      <CartModal  /*meals={selectedMeals}*/ ref={cartModalRef} /*changeQuantity={changeQuantity}*/ checkout={handleOpenCheckoutModal} /*total={total}*//>
      <Header cartClick={openCartModal} /*quantity={quantity}*/ />
      <Meals /*meals={meals} isLoading={isFetching} addItem={addItemToCart}*/ />
    </CartContextProvider>
  );
}

export default App;
