import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const propTypes = {
	/** Allows the user to identify their card type, in the following pattern .card--{type} */
    cardType: PropTypes.string
};

const defaultProps = {
    cardType: 'default'
};

/** A <a href="https://material.io/design/components/cards.html">Card</a> contains content and actions about a single subject. */
function Card({ children, cardType }) {
    return <div className={`bc_card card card--${cardType}`}>{children}</div>;
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
