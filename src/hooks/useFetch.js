import { useCallback, useEffect, useState } from "react"

export function useFetch(fetchFn,initialState){

    const [data,setData]=useState(initialState)
    const [isFetching,setIsFetching]=useState(false)
    const [error,setError]=useState()

    const fetchData=useCallback(async function fetchData(){
        setIsFetching(true)
        try{
            const data= await fetchFn() 
            console.log(data)
            setData(data)
        }catch(error){
            console.log(error)
            console.log(error.message)
            setError(error)
        }
  
        setIsFetching(false)
    },[])
  
    useEffect(()=>{
        fetchData()
    }
    ,[fetchData])

    return {
        fetchedData:data,
        isFetching,
        error
    }
}