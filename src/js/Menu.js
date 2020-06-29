import Pizza from './Pizza.js'

export default class Menu {
    constructor() {
        const marg = new Pizza("Marguerita", 7.90, 'marguerita.jpg');
        const pepp = new Pizza("Pepperoni", 11.90, 'pepperoni.jpg');
        const fro = new Pizza("4 Fromages", 10.90, '4-fromages.jpg');
        const rein = new Pizza("Reine", 9.90, 'reine.jpg');
        
        this.pizzas = [marg, pepp, fro, rein];
    }
}