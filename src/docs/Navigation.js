import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            rootSubmenuKeys: this.props.components.slice()
        };

        console.log(this.props.components);
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    render() {
        const { components } = this.props;
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256 }}
            >
                {components.map((name, index) => {
                    return (
                        <SubMenu key={`${name}-sub-${index}`} title={name}>
                            <Menu.Item key={`${name}-1`}>
                                <a href={`#${name}`}>{name}</a>
                            </Menu.Item>
                        </SubMenu>
                    );
                })}
            </Menu>
        );
    }
}

Navigation.propTypes = {
    components: PropTypes.array.isRequired
};

export default Navigation;
