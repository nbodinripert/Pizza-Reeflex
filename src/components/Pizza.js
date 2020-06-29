import React from 'react'

// Stylesheets
import '../stylesheets/Pizza.css';

export const Pizza = ({name, price, imgSrc, addPizza}) => {
    return (
        <div id="pizzaMainContainer" onClick={addPizza}>
            <img src={require(`../img/pizzas/${imgSrc}`)} alt="pizza" id="pizzaImg"/>
            <div id="pizzaDetails">
                <span id="pizzaName">{name}</span>
                <span id="pizzaPrice">{`${price}€`}</span>
            </div>
        </div>
    )
}
