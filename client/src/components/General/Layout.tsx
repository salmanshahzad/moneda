import React from "react";
import { User } from "../../user";
import axios from "axios";
import getAxiosHeaderConfig from "../../axiosHeaderConfig";
import { Redirect, Route } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";
import NavBar from "./NavBar";
import Dashboard from "../Dashboard/Dashboard";
import Budget from "../Budget/Budget";
import Transactions from "../Transactions/Transactions";
import CategoryDetail from "../CategoryDetail/CategoryDetail";
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
            const user = (await axios.get("/api/user", getAxiosHeaderConfig())).data.user;
            user.categoryInfo = (id: string) => {
                const income = user.income.filter(income => income.id === id);
                if (income.length > 0) {
                    return {
                        type: "income",
                        name: income[0].name
                    };
                }
                const expenses = user.expenses.filter(expense => expense.id === id);
                if (expenses.length > 0) {
                    return {
                        type: "expense",
                        name: expenses[0].name
                    };
                }
            };
            this.setState({auth: "yes", user});
        } catch {
            this.setState({auth: "no"});
        }
    };

    getCategoryDetails = (name: string, type: "income" | "expense") => {
        let category;
        if (type === "income") {
            category = this.state.user.income.filter(income => income.name === name)[0];
        } else {
            category = this.state.user.expenses.filter(expense => expense.name === name)[0];
        }
        return {
            category,
            transactions: this.state.user.transactions.filter(t => t.category_id === category.id),
            upcomingTransactions: this.state.user.upcomingTransactions.filter(t => t.category_id === category.id)
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
                <NavBar sidebarOpen={this.state.sidebarOpen} onOpenSidebar={this.openSidebar} onCloseSidebar={this.closeSidebar} />
                <Sidebar.Pusher onClick={this.closeSidebar}>
                    <Route path="/dashboard" render={props => <Dashboard user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                    <Route path="/budget" render={props => <Budget user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                    <Route path="/transactions" render={props => <Transactions user={this.state.user} onUpdate={this.updateUser} {...props} />} />
                    <Route path="/income/:name" render={props => <CategoryDetail categoryDetail={this.getCategoryDetails(props.match.params.name, "income")} onUpdate={this.updateUser} />} />
                    <Route path="/expense/:name" render={props => <CategoryDetail categoryDetail={this.getCategoryDetails(props.match.params.name, "expense")} onUpdate={this.updateUser} />} />
                    <Route path="/settings" render={props => <Settings user={this.state.user} onUpdate={this.updateUser} />} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
