export async function fetchAvailableFood(){
    const response= await fetch('http://localhost:3000/meals')

    if(!response.ok){
        throw new Error('Failed to fetch data')
    }
    const json= await response.json()  // we write .json() because in the backend we return the data in the JSON format so we want to transform it to convert it to JavaScript objects and values.

    return json
} 

export async function postOrders(order){
    const response= await fetch('http://localhost:3000/orders',{
        method:'POST',
        body:JSON.stringify({order}),
        //we should some headers to add the Content-Type header, and set it to application/json so that the backend understand that we're submitting some data in JSON format, and it should be extracted accordingly.
        headers:{         
            'Content-Type':'application/json'
        }
    })

    const json=response.json() // i put this above the below if condition as json will carry the error message
    if(!response.ok){
        throw new Error(json.message || 'Something went wrong') // if there is an error in json or if there is not send general message
    }


    return json.message
}