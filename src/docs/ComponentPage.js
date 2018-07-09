import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import { getUniqueObjectsByKey } from '../utilities/helpers';

const ComponentPage = ({ component }) => {
	const { name, description, props, examples } = component;
	const uniqueExamples = getUniqueObjectsByKey(examples, 'name');
	const numberOfUniqueExamples = Object.keys(uniqueExamples).length;

    return (
        <div className="componentpage">
            <h2>{name}</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />.
            <h3>Example{numberOfUniqueExamples > 1 && 's'}</h3>
            {numberOfUniqueExamples > 0
                ? Object.keys(uniqueExamples).map((key, index) => {
					  const examples = uniqueExamples[key];
                      return <Example
                          key={index}
                          examples={examples}
                          componentName={name}
                          componentProps={props}
                      />
				})
                : 'No React examples exist.'}
        </div>
    );
};

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;
