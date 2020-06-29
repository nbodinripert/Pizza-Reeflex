// Components
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Header } from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

// Stylesheets
import '../stylesheets/CurrentOrders.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Pizzeria from '../js/Pizzeria';

library.add(faEdit, faTrash);
Modal.setAppElement('#root');

export default class CurrentOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.getOrdersFromLocalStorage(),
            modalIsOpen: false,
            orderIdToDelete: -1
        }
    } 

    getOrdersFromLocalStorage() {
        let pizzeriaJson = localStorage.getItem("pizzeria");
        let orders = [];
        if(pizzeriaJson) {
            orders = JSON.parse(pizzeriaJson).orders;
        }
        return orders;
    }

    openModal(id) {
        this.setState({
            orderIdToDelete: id,
            modalIsOpen: true,
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            orderIdToDelete: -1
        });
    }

    deleteOrder() {
        let pizzeriaJson = localStorage.getItem("pizzeria");
        if(pizzeriaJson) {
            let pizzeria = Object.assign(new Pizzeria(this.menu), JSON.parse(pizzeriaJson));
            pizzeria.removeOrderById(this.state.orderIdToDelete);
            localStorage.setItem("pizzeria", JSON.stringify(pizzeria));
            this.setState({
                orders: pizzeria.orders
            });
            this.closeModal();
        } else {
            alert("Une erreur est survenue");
        }
    }

    renderOrdersTable() {
        return this.state.orders.map((order) => {
            return (
                <tr key={order.id}>
                    <td>Commande n°{order.id}</td>
                    <td>{order.total.toFixed(2)}€</td>
                    <td style={
                        {
                            backgroundColor: order.isPaid ? '#4D7B43' : '#DC9D37',
                            color: 'white',
                            paddingLeft: "0.5rem"
                        }
                    }>
                        {order.isPaid ? "Réglé" : "En attente de paiement"}
                    </td>
                    <td className={order.isPaid ? 'hidden' : 'btnTd'}>
                        <Link to={`/newOrder/${order.id}`} className='text-link'>
                            <div id="editBtn" className="iconDiv">
                                <FontAwesomeIcon icon={"edit"} className="icon" />
                            </div>
                        </Link>
                        <div id="deleteBtn" className="iconDiv" onClick={() => this.openModal(order.id)}>
                            <FontAwesomeIcon icon={"trash"} className="icon" />
                        </div>
                    </td>
                </tr>
            );
        });
    }

    renderModal() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Modal"
                className="modal"
                shouldCloseOnOverlayClick={false}
                >
                <h2>Supprimer cette pizza ?</h2>
                <p>{`Êtes-vous sûr de vouloir supprimer la commande n°${this.state.orderIdToDelete} ?`}</p>
                <div id="modalBtnsContainer">
                    <span className="spanBtn" id="yesBtn" onClick={() => this.deleteOrder()}>Oui</span>
                    <span className="spanBtn" id="noBtn" onClick={() => this.closeModal()}>Non</span>
                </div>
            </Modal>
        );
    }

    render() {
        return (
            <div>
                <div id="currentOrdersMainContainer">
                    <Header hasLeftArrow={true}/>
                    <div id="ordersContainer">
                        <h2>Liste des commandes</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Total Commande</th>
                                    <th>Statut Commande</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderOrdersTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.renderModal()}
            </div>
        )
    }
}
