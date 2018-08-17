import React from "react";
import { User } from "../../../../user";
import axios from "axios";
import { Redirect, Route } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../Dashboard/Dashboard";
import Budget from "../Budget/Budget";
import AccountDetail from "../Budget/AccountDetail";
import Settings from "../Settings/Settings";

interface LayoutState {
    sidebarOpen: boolean;
    auth: "loading" | "no" | "yes";
    user: User;
}

export default class Layout extends React.Component<{}, LayoutState> {
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

    updateUser = async () => {
        try {
            const response = await axios.get("/api/user");
            this.setState({auth: "yes", user: response.data});
        } catch {
            this.setState({auth: "no"});
        }
    };

    getAccountDetails = (name: string, type: "income" | "expense") => {
        let account;
        if (type === "income") {
            account = this.state.user.income.filter(income => income.name === name)[0];
        } else {
            account = this.state.user.expenses.filter(expense => expense.name === name)[0];
        }
        return {
            account,
            transactions: this.state.user.transactions.filter(t => t.account_id === account.id),
            upcomingTransactions: this.state.user.upcomingTransactions.filter(t => t.account_id === account.id)
        };
    };

    render(): React.ReactNode {
        if (this.state.auth === "loading") {
            return <br />;
        } else if (this.state.auth === "no") {
            return <Redirect to="/sign_out" />;
        }
        return (
            <Sidebar.Pushable>
                <NavBar sidebarOpen={this.state.sidebarOpen} onOpenSidebar={this.openSidebar} />
                <Sidebar.Pusher onClick={this.closeSidebar}>
                    <Route path="/dashboard" render={props => <Dashboard user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                    <Route path="/budget" render={props => <Budget user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                    <Route path="/income/:account" render={props => <AccountDetail account={this.getAccountDetails(props.match.params.account, "income")} onUpdate={this.updateUser} />} />
                    <Route path="/expense/:account" render={props => <AccountDetail account={this.getAccountDetails(props.match.params.account, "expense")} onUpdate={this.updateUser} />} />
                    <Route path="/settings" render={props => <Settings user={this.state.user} onUpdate={this.updateUser} />} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
