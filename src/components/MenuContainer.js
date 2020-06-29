import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

// Stylesheets
import '../stylesheets/MenuContainer.css';

const MenuContainer = ({id, linkTo, bgColor, icon, menuTitle, menuText}) => {
    return (
        <Link to={`/${linkTo}`} className='text-link'>
            <div className="orderMenuContainer" id={id} style={
                {
                    backgroundColor: bgColor
                }
            }>
                <FontAwesomeIcon icon={icon} className="iconMenu" />
                <hr/>
                <h1>{menuTitle}</h1>
                <span>{menuText}</span>
            </div>
        </Link>
    );
}

export default MenuContainer;