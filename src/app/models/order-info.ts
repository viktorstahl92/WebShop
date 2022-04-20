export interface OrderInfo {
    orderId : number
    customerId : number
    customerName : string
    address : string
    orderDate : Date
    dueDate : Date
    orderStatus : string
    totalPrice : number
    orderRows : Array<OrderRow>
}

export interface OrderRow{
    productNumber:number
    productName:string
    quantity:number
    productPrice:number
}
