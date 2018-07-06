import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

const ComponentPage = ({component}) => {
  const {name, description, props, examples} = component;
  const reactExamples = examples.filter(example => example.fileType === 'js');
  const htmlExamples = examples.filter(example => example.fileType === 'html');

  return (
    <div className="componentpage">
      <h2>{name}</h2>
	  <div dangerouslySetInnerHTML={{ __html: description }}/>

      <h3>React Example{reactExamples.length > 1 && "s"}</h3>
      {
        reactExamples.length > 0 ?
        reactExamples.map( example => <Example key={example.name} example={example} componentName={name} /> ) :
        "No React examples exist."
	  }
      <h4>Props</h4>
      {
        props ?
        <Props props={props} /> :
        "This component accepts no props."
	  }

	  <h3>Html Example{htmlExamples.length > 1 && "s"}</h3>
      {
        htmlExamples.length > 0 ?
        htmlExamples.map( example => <Example key={example.name} example={example} componentName={name} /> ) :
        "No Html examples exist."
      }
    </div>
  )
};

ComponentPage.propTypes = {
  component: PropTypes.object.isRequired
};

export default ComponentPage;
