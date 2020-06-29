import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Stylesheets
import '../stylesheets/PizzaDetailsNewOrder.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faMinus);

export const PizzaDetailsNewOrder = ({pizzaName, quantity, unitPrice, onAddBtnClicked, onRemoveBtnClicked}) => {
    return (
        <div style={
            {
                display: quantity === 0 ? 'none' : 'block',
                height: '3.7rem'
            }
        }>
            <div id="pizzaDetailsMainContainer">
                <span>{pizzaName}</span>
                <span>{(quantity*unitPrice).toFixed(2)}€</span>

            </div>
            <div id="pizzaDetailsSecondContainer">
                <span>({quantity} x {unitPrice}€)</span>
                <div id="addRemoveBtnContainer">
                    <FontAwesomeIcon icon={"plus"} className="addRemoveIcon" id="addIcon" onClick={onAddBtnClicked}/>
                    <FontAwesomeIcon icon={"minus"} className="addRemoveIcon" id="removeIcon" onClick={onRemoveBtnClicked}/>
                </div>
            </div>
        </div>
    )
}
