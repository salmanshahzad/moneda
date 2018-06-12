import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Redirect, Route } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../Dashboard/Dashboard";

interface LayoutProps {
    location?: any; // given by React Router
}

interface LayoutState {
    sidebarOpen: boolean;
    auth: "loading" | "no" | "yes";
    user: User;
}

export default class Layout extends React.Component<LayoutProps, LayoutState> {
    state: LayoutState = {
        sidebarOpen: false,
        auth: "loading",
        user: null
    };

    componentDidMount() {
        this.updateUser();
    }

    openSidebar = () => {
        this.setState({sidebarOpen: true});
    };
    
    closeSidebar = () => {
        this.setState({sidebarOpen: false});
    };

    updateUser = () => {
        axios.get("/api/user").then(response => {
            this.setState({
                auth: "yes",
                user: response.data
            });
        }).catch(() => this.setState({auth: "no"}));
    };

    render(): React.ReactNode {
        if (this.state.auth === "loading") {
            return <br />;
        } else if (this.state.auth === "no") {
            return <Redirect to="/sign_out" />;
        }
        return (
            <Sidebar.Pushable>
                <NavBar activePage={this.props.location.pathname} sidebarOpen={this.state.sidebarOpen} onOpenSidebar={this.openSidebar} />
                <Sidebar.Pusher onClick={this.closeSidebar}>
                    <Route path="/dashboard" render={props => <Dashboard user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
