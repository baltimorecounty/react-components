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
        const { componentName, componentProps } = this.props;

        const reactExample = this.props.examples.filter(
            example => example.fileType === 'js'
        )[0];
        const htmlExample = this.props.examples.filter(
            example => example.fileType === 'html'
        )[0];
        const razorExample = this.props.examples.filter(
            example => example.fileType === 'cshtml'
        )[0];

        const buildTabContent = example => {
			const { code, fileType, name } = example;

            const ExampleComponent = require(`./examples/${componentName}/${name}`)
                .default;
            const isFileRazor = fileType === 'cshtml';
            const isFileHtml = fileType === 'html';
            const isFileReact = fileType === 'js';

            return (
                <div className={`example example--${name}`}>
                    {isFileReact && <ExampleComponent />}
                    {isFileHtml && (
                        <div dangerouslySetInnerHTML={{ __html: code }} />
                    )}

                    {!isFileRazor && (
                        <button onClick={this.toggleCode}>
                            {showCode ? 'Hide' : 'Show'} Code
                        </button>
                    )}

                    {(showCode || isFileRazor) && (
                        <CodeExample language={fileType}>{code}</CodeExample>
                    )}

                    {isFileReact && (
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

        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="React" key="1">
                    {reactExample
                        ? buildTabContent(reactExample)
                        : 'No React example provided.'}
                </TabPane>
                <TabPane tab="Html" key="2">
                    {htmlExample
                        ? buildTabContent(htmlExample)
                        : 'No Html example provided.'}
                </TabPane>
                <TabPane tab="Razor" key="3">
                    {razorExample
                        ? buildTabContent(razorExample)
                        : 'No Razor example provided.'}
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
