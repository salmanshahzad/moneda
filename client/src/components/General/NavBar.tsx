import React from "react";
import { Responsive, Menu, Sidebar, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface NavBarProps {
    activePage: string;
    sidebarOpen: boolean;
    onOpenSidebar: () => void;
}

export default class NavBar extends React.Component<NavBarProps, {}> {
    menuItems = [
        <Menu.Item name="Dashboard" active={this.props.activePage === "/dashboard"} as={Link} to="/dashboard" key={0} />,
        <Menu.Item name="Budget" active={this.props.activePage === "Budget"} as={Link} to="/budget" key={1} />,
        <Menu.Item name="Portfolio" active={this.props.activePage === "Portfolio"} as={Link} to="/portfolio" key={2} />,
        <Menu.Item name="Settings" active={this.props.activePage === "Settings"} as={Link} to="/settings" key={3} />,
        <Menu.Item name="Sign Out" as={Link} to="/sign_out" key={4} />
    ];

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Responsive maxWidth={767}>
                    <Menu size="huge">
                        <Menu.Item header>Moneda</Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item onClick={this.props.onOpenSidebar}><Icon name="bars" /></Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Sidebar visible={this.props.sidebarOpen} animation="push" direction="right" as={Menu} vertical>
                        {this.menuItems}
                    </Sidebar>
                </Responsive>
                <Responsive minWidth={767}>
                    <Menu size="huge">
                        <Menu.Item header>Moneda</Menu.Item>
                        <Menu.Menu position="right">
                            {this.menuItems}
                        </Menu.Menu>
                    </Menu>
                </Responsive>
            </React.Fragment>
        );
    }
}
