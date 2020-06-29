import React, { Component } from 'react';
import { Header } from './Header';

// Stylesheets
import '../stylesheets/OrderPayment.css';

export default class OrderPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.getOrdersFromLocalStorage()
        };
    }

    getOrdersFromLocalStorage() {
        let pizzeriaJson = localStorage.getItem("pizzeria");
        let orders = [];
        if(pizzeriaJson) {
            orders = JSON.parse(pizzeriaJson).orders;
        }
        return orders;
    }

    renderOrdersSelectOptions() {
        return this.state.orders.map((order) => {
            return (
                <option value={order.id}>{`Commande n°${order.id}`}</option>
            );
        });
    }

    render() {
        return (
            <div id="orderPaymentMainContainer">
                <Header hasLeftArrow={true}/>
                <div className={this.state.orders.length == 0 ? 'hidden' : 'orderPaymentSecondContainer'}>
                    <div id="selectOrderContainer">
                        <span>Sélectionner la commande à encaisser</span>
                        <select>
                            {this.renderOrdersSelectOptions()}
                        </select>
                    </div>
                    <div id="orderDetailsContainer">
            
                    </div>
                </div>
            </div>
        )
    }
}
