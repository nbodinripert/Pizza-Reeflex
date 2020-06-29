export default class Pizzeria {
    constructor(menu) {
        this.orders = [];
        this.menu = menu;
        this.nbOrders = 0;
    }

    addOrder(order) {
        this.nbOrders++;
        order.id = this.nbOrders;
        this.orders.push(order);
    }

    editOrder(order) {
        let index = this.getOrderIndex(order.id);
        this.orders[index] = order;
    }

    getOrderById(orderId){
        return this.orders.find(order => order.id == orderId);
    }

    getOrderIndex(id) {
        for(let i = 0; i < this.orders.length; i++) {
            if(this.orders[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    removeOrderById(orderId){
        let index = this.getOrderIndex(orderId);
        this.orders.splice(index, 1);
    }
}