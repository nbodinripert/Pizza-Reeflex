// Components
import React from 'react';
import { Link } from 'react-router-dom'

// Stylesheets
import '../stylesheets/Header.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPizzaSlice, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faPizzaSlice, faArrowLeft);

export const Header = ({hasLeftArrow}) => {
    let leftArrow = 
        <Link to="/" className='text-link'>
            <FontAwesomeIcon icon="arrow-left" id="arrowLeft"/>
        </Link>;
    if(!hasLeftArrow){
        leftArrow = null;
    }

    return (
        <div id="header">
            {leftArrow}
            <FontAwesomeIcon icon="pizza-slice" id="pizzaIcon"/>
            <span>Pizza Reeflex</span>
        </div>
    )
}
