export default class Order {
    constructor(id, menu) {
        this.orderDetailsList = new Array(menu.pizzas.length); // à l'index i: la quantité commandée
        for(let i = 0; i < menu.pizzas.length; i++){
            this.orderDetailsList[i] = 0;
        }
        this.id = id;
        this.total = 0;
        this.isPaid = false;
    }
}