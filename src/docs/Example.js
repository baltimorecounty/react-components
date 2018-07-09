import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';
import Props from './Props';
import './Example.css';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;



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
            return { showCode: !prevState.showCode };
        });
    };

    render() {
		const { showCode } = this.state;
		const {
			componentName,
			componentProps
		} = this.props;


        const reactExample = this.props.examples.filter(
            example => example.fileType === 'js'
        )[0];
        const htmlExample = this.props.examples.filter(
            example => example.fileType === 'html'
		)[0];

        const buildTabContent = example => {
			const {
				code,
				fileType,
				name,
				type
			} = example;

			const ExampleComponent = require(`./examples/${componentName}/${name}`).default;

            return (
                <div className={`example example--${name}`}>
                    {fileType === 'js' && <ExampleComponent />}
                    {fileType === 'html' && (
                        <div dangerouslySetInnerHTML={{ __html: code }} />
                    )}

                    <p>
                        <button onClick={this.toggleCode}>
                            {showCode ? 'Hide' : 'Show'} Code
                        </button>
                    </p>

                    {showCode && (
                        <CodeExample language={type}>{code}</CodeExample>
                    )}

                    {fileType === 'js' && (
                        <React.Fragment>
                            <h4>Props</h4>
                            {componentProps ? (
                                <Props props={componentProps} />
                            ) : (
                                'This component accepts no props.'
                            )}
                        </React.Fragment>
                    )}
                </div>
            );
        };

        // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.


        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="React" key="1">
                    { reactExample ? buildTabContent(reactExample) : "No React example provided."}
                </TabPane>
                <TabPane tab="Html" key="2">
					{ htmlExample ? buildTabContent(htmlExample) : "No Html example provided."}
                </TabPane>
                <TabPane tab="Razor" key="3">
                    Not Implement
                </TabPane>
            </Tabs>
        );
    }
}

Example.propTypes = {
    examples: PropTypes.array.isRequired,
    componentName: PropTypes.string.isRequired
};

export default Example;
