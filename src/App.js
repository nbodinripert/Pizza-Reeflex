// Components
import React, { Component } from 'react';
import MenuContainer from './components/MenuContainer';
import { Header } from './components/Header';

// Stylesheets
import './stylesheets/App.css';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTruck, faFire, faEuroSign } from '@fortawesome/free-solid-svg-icons';

// Objects
import Pizzeria from './js/Pizzeria';
import Menu from './js/Menu';

library.add(faTruck, faFire, faEuroSign);

class App extends Component {
  constructor(props) {
    super(props);
    // localStorage.clear();
    let pizzeriaJson = localStorage.getItem("pizzeria");
    if(!pizzeriaJson) {
      this.pizzeria = new Pizzeria(new Menu());
      localStorage.setItem("pizzeria", JSON.stringify(this.pizzeria));
    } else {
      this.pizzeria = JSON.parse(pizzeriaJson);
    }
  }

  render() {
    return (
      <div className="App">
        <div id="mainAppContainer">
          <Header hasLeftArrow={false} id="appHeader"/>
          <div id="menuContainer">
            <MenuContainer linkTo={`newOrder/${this.pizzeria.nbOrders+1}`} bgColor="#2A6890" icon="truck" menuTitle="Nouvelle Commande" menuText="Créer et enregistrer une nouvelle commande"/>
            <MenuContainer linkTo="currentOrders" bgColor="#852811" icon="fire" menuTitle="Commande en cours" menuText="Voir le détail des commandes en cours"/>
            <MenuContainer linkTo="orderPayment" bgColor="#3F8E3E" icon="euro-sign" menuTitle="Paiement commande" menuText="Encaisser une commande"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
