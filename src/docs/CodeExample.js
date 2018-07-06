import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml';

// This way is easy, but adds 170K gzipped to bundle since all langs are included.
// import Highlight from 'react-highlight';

class CodeExample extends React.Component {
  componentDidMount() {
	if (this.props.language === 'html') {
		hljs.registerLanguage('xml', xml);
	}
	else {

		hljs.registerLanguage('javascript', javascript);
	}

    hljs.highlightBlock(this.element);
  }

  getHighlighter() {

  }

  render() {
    return (
      <pre ref={ref => { this.element = ref }}>
        <code>
          {this.props.children}
        </code>
      </pre>
    )
  }
}

CodeExample.propTypes = {
  language: PropTypes.string,
  children: PropTypes.string.isRequired
};

CodeExample.defaultPropTypes = {
	language: 'javascript'
};

export default CodeExample;
