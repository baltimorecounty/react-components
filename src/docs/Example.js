import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

// This way is easy, but adds 214K gzipped to bundle since all langs are included.
// import Highlight from 'react-highlight';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

  toggleCode = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {showCode: !prevState.showCode};
    });
  }

  render() {
    const {showCode} = this.state;
    const {code, description, name, fileType } = this.props.example;
	// Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
    const ExampleComponent = require(`./examples/${this.props.componentName}/${name}`).default;
    return (
      <div className="example">
        {description && <h4>{description}</h4> }

		{ fileType === 'js' && <ExampleComponent /> }
		{ fileType === 'html' && <div dangerouslySetInnerHTML={{ __html: code }}/> }

        <p>
          <button onClick={this.toggleCode}>
            {showCode ? "Hide" : "Show"} Code
          </button>
        </p>

        {showCode && <CodeExample language={fileType}>{code}</CodeExample>}
      </div>
    )
  }
}

Example.propTypes = {
  example: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired
}

export default Example;
