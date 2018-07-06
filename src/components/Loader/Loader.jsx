import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const propTypes = {
	/** Screen reader text, will not visually display */
    message: PropTypes.string
};

const defaultProps = {
    message: 'Loading...'
};

/** A simple indicator that something is loading */
function Loader({ message }) {
    return (
        <div className="bc_loader">
            <FontAwesomeIcon icon={faSpinner} size="3x" spin pulse fixedWidth />
            <span className="sr-only">{message}</span>
        </div>
    );
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
