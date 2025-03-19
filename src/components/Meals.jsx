import { useContext,useState, useEffect } from "react"
import { currencyFormatter } from "../util/formatting"
import { CartContext } from "../store/cart-context"
import { fetchAvailableFood } from "../http"
import { useFetch } from "../hooks/useFetch"
import ErrorPage from "./Error"


export default function Meals(){
    const ctx=useContext(CartContext)

    const {fetchedData:meals,isFetching,error} = useFetch(fetchAvailableFood,[])


    // const [meals,setMeals]=useState([])
    // const [isFetching,setIsFetching]=useState(false)
    // const [error,setError]=useState()


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
    
    return(
        <>
            {isFetching&& <p style={{textAlign:'center',fontSize:'30px'}}>Fetching availabel meals...</p>}
            {error? <ErrorPage message={error.message} /> :  <ul id="meals">
            {meals.map((meal)=>{

                const source=`http://localhost:3000/${meal.image}`

                return <li key={meal.id} className="meal-item">
                    <article>
                        <img src={source} alt={meal.name} />
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                        <p className="meal-item-description">{meal.description}</p>
                        <div className="meal-item-actions">
                            <button className="button" onClick={()=>ctx.addItem(meal)} >Add to cart</button>
                        </div>
                    </article>
                </li>
            })}
        </ul>}
        </>
        
    )
}