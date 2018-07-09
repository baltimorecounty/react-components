import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ route: window.location.hash.substr(1) });
        });
    }

    render() {
        const { route } = this.state;
        const component = route
            ? componentData.filter(component => component.name === route)[0]
            : componentData[0];

        return (
            <Layout style={{ height:"100vh" }}>
                <Header className="header">
                    <h1 className="app-header">Baltimore County Web Components</h1>
                </Header>
                <Layout>
                    <Sider width={250}>
                        <Navigation components={componentData} />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <ComponentPage component={component} />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
