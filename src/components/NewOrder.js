// Components
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Header } from './Header';
import { Pizza } from './Pizza';
import { PizzaDetailsNewOrder } from './PizzaDetailsNewOrder';
import Modal from 'react-modal';

// Objects
import Menu from '../js/Menu.js';
import Order from '../js/Order.js';
import Pizzeria from '../js/Pizzeria';

// Stylesheets
import '../stylesheets/NewOrder.css';

Modal.setAppElement('#root');

export default class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.menu = new Menu();
        let order = this.getOrderById(this.props.match.params.id);
        this.state = {
            pizzas: this.menu.pizzas,
            order: order,
            orderDetailsList: order.orderDetailsList,
            modalIsOpen: false
        }
    }

    getOrderById(id) {
        let pizzeriaJson = localStorage.getItem("pizzeria");
        let order = new Order(null, this.menu);;
        if(pizzeriaJson) {
            let pizzeria = Object.assign(new Pizzeria(this.menu), JSON.parse(pizzeriaJson));
            order = pizzeria.getOrderById(id);
            if(order == undefined) {
                order = new Order(null, this.menu);
            }
        }
        return order;
    }

    addPizza(index) {
        const order = {...this.state.order};
        order.orderDetailsList[index]++;

        order.total += this.menu.pizzas[index].price;
        order.total = Number(order.total.toFixed(2));

        this.setState({
            order: order,
            orderDetailsList: order.orderDetailsList,
        });
    }

    removePizza (index) {
        const order = {...this.state.order};
        order.orderDetailsList[index]--;

        order.total -= this.menu.pizzas[index].price;
        order.total = Number(order.total.toFixed(2));

        this.setState({
            order: order,
            orderDetailsList: order.orderDetailsList,
        });
    }

    onOrderBtnClicked = () => {
        let pizzeriaJson = localStorage.getItem("pizzeria");
        if(pizzeriaJson && this.state.order.total !== 0) {
            
            let pizzeria = Object.assign(new Pizzeria(this.menu), JSON.parse(pizzeriaJson));
            if(this.state.order.id == null) {
                pizzeria.addOrder(this.state.order);
            } else {
                pizzeria.editOrder(this.state.order);
            }
            
            localStorage.setItem("pizzeria", JSON.stringify(pizzeria));

            this.openModal();
        } else {
            alert("Une erreur est survenue");
        }
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }

    renderPizzas(){
        return this.state.pizzas.map((pizza, index) => {
            return (
                <Pizza
                    key={pizza.name} 
                    name={pizza.name} 
                    price={pizza.price} 
                    imgSrc={pizza.imgSrc} 
                    addPizza = {() => this.addPizza(index)}
                />
            );
        });
    }

    renderOrderDetailsList() {
        return this.state.order.orderDetailsList.map((quantity, index) => {
            return(
                <PizzaDetailsNewOrder 
                    key={this.state.pizzas[index].name}
                    pizzaName={this.state.pizzas[index].name}
                    quantity={quantity}
                    unitPrice={this.state.pizzas[index].price}
                    onAddBtnClicked={() => this.addPizza(index)}
                    onRemoveBtnClicked={() => this.removePizza(index)}/>
            );
        });
    }

    render() {
        const id = this.props.match.params.id;
        const total = this.state.order.total.toFixed(2);

        return (
            <div id="newOrderMainContainer">
                <Header hasLeftArrow={true}/>
                <div id="secondContainer">
                    <div id="pizzasContainer">
                        {this.renderPizzas()}
                    </div>
                    <div id="orderContainer">
                        <h2 id="orderTitle">Détail de la commande n°{id}</h2>
                        {this.renderOrderDetailsList()}
                        <div id="orderTotal">
                            <p>Soit un total de : <span>{total}€</span></p>
                        </div>
                            <div onClick={this.onOrderBtnClicked} className={this.state.order.total === 0 ? "hiddenBtn" : "showBtn"}>
                                <p>Passer la commande</p>
                            </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Modal"
                    className="modal"
                    shouldCloseOnOverlayClick={false}
                    >
                    <h2>Commande effectuée !</h2>
                    <Link to={`/`} className='text-link'>
                        <div id="modalCLoseBtn">
                            <p>Revenir à l'écran d'accueil</p>
                        </div>
                    </Link>
                </Modal>
            </div>
        )
    }
}