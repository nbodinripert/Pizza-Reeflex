import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import NotFound from "./components/NotFound"
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import NewOrder from './components/NewOrder';
import CurrentOrders from './components/CurrentOrders';
import OrderPayment from './components/OrderPayment';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/newOrder/:id" component={NewOrder}/>
                <Route path="/currentOrders" component={CurrentOrders}/>
                <Route path="/orderPayment" component={OrderPayment}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
