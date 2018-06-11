import React from "react";
import { Sidebar } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

interface LayoutProps {
    location?: any; // given by React Router
}

interface LayoutState {
    sidebarOpen: boolean;
}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
    state: LayoutState = {
        sidebarOpen: false
    };

    openSidebar = () => {
        this.setState({sidebarOpen: true});
    };
    
    closeSidebar = () => {
        this.setState({sidebarOpen: false});
    };

    render(): React.ReactNode {
        return (
            <Sidebar.Pushable>
                <NavBar activePage={this.props.location.pathname} sidebarOpen={this.state.sidebarOpen} onOpenSidebar={this.openSidebar} />
                <Sidebar.Pusher onClick={this.closeSidebar}>
                    <Route path="/dashboard" component={Dashboard} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
