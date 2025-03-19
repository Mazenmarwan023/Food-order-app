//  It is for formatting numbers to currencies.
export const  currencyFormatter= new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD'
})