import { createContext, useState, useEffect,useReducer } from "react";
import { fetchAvailableFood } from "../http"
import Meals from "../components/Meals";
import ErrorPage from "../components/Error";



export const CartContext=createContext({
    selectedMeals:[],
    total:0,
    quantity:0,
    addItem:()=>{},
    changeQuantity:()=>{},
    clearCart:()=>{}
})

function cartReducer(state,action){
  if(action.type==='ADD_ITEM'){
    const newItems=[...state]
    if(newItems.some((meal)=>meal.id===action.payload.id)){
      const newState=newItems.map((meal)=>{
        if(meal.id===action.payload.id){
          const newMeal={...meal}
          newMeal.quantity+=1
          return newMeal
        }
        return meal
      })
      return newState
    }
    
    return [...state,{id:action.payload.id,name:action.payload.name,price:action.payload.price,quantity:1}]
  }

  if(action.type==='CHANGE_QUANTITY'){
    const newState=[...state.map((meal)=>{
      if(meal.id===action.payload.id){
            const newMeal={...meal}
            if(action.payload.state==='increment'){
            newMeal.quantity+=1
            // return {...meal,quantity:meal.quantity+1}
            }
            else{
              newMeal.quantity-=1
              // return {...meal,quantity:meal.quantity-1}
            }
            return newMeal
      }
      return meal

    })]
    const newItems=newState.filter((meal)=>meal.quantity>0)


    return newItems

  }

  if(action.type==='CLEAR'){
    return []
  }

  return state

  }






export default function CartContextProvider({children}){
    
    // const [selectedMeals,setSelectedMeals]=useState([])

    const [selectedMealsState,dispatch]=useReducer(cartReducer,[])
    

    function addItemToCart(selectedMeal){

      dispatch({
        type:'ADD_ITEM',
        payload:selectedMeal
      })
        // setSelectedMeals(oldState =>{
        //   if(selectedMeals.some((meal)=>meal.id===selectedMeal.id)){
        //     const newState=[...oldState.map((meal)=>{
        //       if(meal.id===selectedMeal.id){
        //         const newMeal={...meal}
        //         newMeal.quantity+=1
        //         return newMeal
        //       }
        //       return meal
        //     })]
        //     return newState
        //         }
    
        //   return [...oldState,{id:id,name:selectedMeal.name,price:selectedMeal.price,quantity:1}]
        // })
      }
    
     
    
      function changeQuantity(id,state){

        dispatch({
          type:'CHANGE_QUANTITY',
          payload:{
            id,
            state
          }
        })

        // setSelectedMeals(oldState =>{            
          // const newState=[...oldState.map((meal)=>{
          //   if(meal.id===id){
          //         const newMeal={...meal}
          //         if(state==='increment'){
          //         newMeal.quantity+=1
          //         }
          //         else{
          //           newMeal.quantity-=1
          //         }
          //         return newMeal
          //   }
          //   return meal
    
          // })]
    
          // return newState
          //     })
    
          // setSelectedMeals(oldState=>{
          //   return [...oldState.filter((meal)=>meal.quantity>0)]
          // })
        }

        function clearCart(){
          dispatch({type:'CLEAR'})
        }

        let quantity=0 // total quantity in cart
        // let total=0
        selectedMealsState.map((meal)=>{
        quantity+=meal.quantity
        // total+=meal.quantity * +meal.price
        })

        const total=selectedMealsState.reduce((totalPrice,item)=>{
          return totalPrice+= item.price * item.quantity
        },0)



        const ctxValue={
            selectedMeals:selectedMealsState,
            total,
            quantity,
            addItem:addItemToCart,
            changeQuantity:changeQuantity,
            clearCart
        }


        return(
            <CartContext value={ctxValue}>
                {children}
            </CartContext>
        )








}