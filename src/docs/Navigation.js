import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            rootSubmenuKeys: this.props.components.slice()
        };
	}

	getUniqueValuesByKey(arr, key) {
		return arr.reduce((uniqueKeys, currentValue, currentIndex) => {
			const val = currentValue[key];
			if (!uniqueKeys.includes(val)) {
				uniqueKeys.push(val);
			}
			return uniqueKeys;
		}, []);
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
            >
                {components.map((component, index) => {
                    return (
                            <SubMenu
                                key={`${component.name}-sub-${index}`}
                                title={component.name}
                            >
                                <MenuItemGroup
                                    key={`menu-group-1-${component.name}`}
                                    title="Overview"
                                >
                                    <Menu.Item key={`${component.name}-1`}>
                                        <a href={`#${component.name}`}>
                                            {component.name}
                                        </a>
                                    </Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup
                                    key={`${component.name}-examples`}
                                    title="Examples"
                                >
                                    {this.getUniqueValuesByKey(component.examples, 'name').map(exampleName => (
                                        <Menu.Item key={`${exampleName}-1`}>
                                            <a
                                                href={`#${component.name}-${
                                                    exampleName
                                                }`}
                                            >
                                                {exampleName.replace(/-/g, ' ')}
                                            </a>
                                        </Menu.Item>
                                    ))}
                                </MenuItemGroup>
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
