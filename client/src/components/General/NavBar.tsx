import React from "react";
import { Responsive, Menu, Sidebar, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

interface NavBarProps {
    sidebarOpen: boolean;
    onOpenSidebar: () => void;
    onCloseSidebar: () => void;
}

export default (props: NavBarProps) => {
    const menuItems = [
        <Menu.Item name="Dashboard" as={NavLink} to="/dashboard" onClick={props.onCloseSidebar} key={0} />,
        <Menu.Item name="Budget" as={NavLink} to="/budget" onClick={props.onCloseSidebar} key={1} />,
        <Menu.Item name="Portfolio" as={NavLink} to="/portfolio" onClick={props.onCloseSidebar} key={2} />,
        <Menu.Item name="Settings" as={NavLink} to="/settings" onClick={props.onCloseSidebar} key={3} />,
        <Menu.Item name="Sign Out" as={NavLink} to="/sign_out" onClick={props.onCloseSidebar} key={4} />
    ];

    return (
        <React.Fragment>
            <Responsive maxWidth={767}>
                <Menu size="huge">
                    <Menu.Item header>Moneda</Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item onClick={props.onOpenSidebar}><Icon name="bars" /></Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Sidebar visible={props.sidebarOpen} animation="push" direction="right" as={Menu} vertical>
                    {menuItems}
                </Sidebar>
            </Responsive>
            <Responsive minWidth={767}>
                <Menu size="huge">
                    <Menu.Item header>Moneda</Menu.Item>
                    <Menu.Menu position="right">
                        {menuItems}
                    </Menu.Menu>
                </Menu>
            </Responsive>
        </React.Fragment>
    );
}
