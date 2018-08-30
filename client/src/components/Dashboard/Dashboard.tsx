import React from "react";
import axios from "axios";
import { User } from "../../user";
import getAxiosHeaderConfig from "../../axiosHeaderConfig";
import { Header, Grid, Segment, Tab } from "semantic-ui-react";
import Joyride from "react-joyride";
import { EVENTS } from "react-joyride/lib/constants";
import ExpenseChart from "../Budget/ExpenseChart";
import AddTransaction from "./AddTransaction";
import RecentTransactions from "./RecentTransactions";
import UpcomingTransactions from "./UpcomingTransactions";

interface DashboardProps {
    user: User;
    onUpdate: () => void;
}

export default (props: DashboardProps) => {
    const joyrideSteps = [
        {
            target: ".title",
            content: "Welcome to Moneda!",
            disableBeacon: true // start the tour automatically
        },
        {
            target: ".add-transaction",
            content: "Add expense and income transactions here. If the date you choose is in the future, the transaction will show up in the upcoming transactions below."
        },
        {
            target: ".upcoming-transactions",
            content: "Here you can set upcoming transactions as paid.",
        },
        {
            target: "a[href='/budget']",
            content: "See a more detailed view of your budget."
        },
        {
            target: "a[href='/transactions']",
            content: "Your full log of transactions are available here."
        },
        {
            target: "a[href='/settings']",
            content: "In the settings, you can change your user information, import and export transactions, and customize your income and expense categories."
        }
    ];

    const joyrideCallback = e => {
        // if the tour is over, remove the "show tour" key from local storage
        if (e.type === EVENTS.TOUR_END) {
            localStorage.removeItem("show tour");
        }
    };

    const onAddTransaction = (categoryId: string, amount: number, note: string, date: number): Promise<{}> => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/user/transaction", {categoryId, amount, note, date}, getAxiosHeaderConfig());
                resolve();
                props.onUpdate();
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    const onPayTransaction = async (id: string) => {
        await axios.put(`/api/user/transaction/${id}`, null, getAxiosHeaderConfig());
        props.onUpdate();
    };

    const onDeleteTransaction = async (id: string) => {
        await axios.delete(`/api/user/transaction/${id}`, getAxiosHeaderConfig());
        props.onUpdate();
    };

    return (
        <Grid columns={16} style={{padding: "1rem"}}>
            <Joyride callback={joyrideCallback} continuous locale={{last: "Done"}} run={localStorage.getItem("show tour") === "true"} showSkipButton steps={joyrideSteps} />
            <Grid.Column mobile={16} tablet={16} computer={16}>
                <Header as="h1" className="title">Dashboard</Header>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment style={{height: "50vh"}}>
                    {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                    <Header style={{marginTop: "-.14285714em"}}>Expenses Chart</Header>
                    <ExpenseChart expenses={props.user.expenses} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment className="add-transaction">
                    <Header>Add Transaction</Header>
                    <Tab panes={[
                        {
                            menuItem: "Expense",
                            render: () => <AddTransaction categories={props.user.expenses} onAddTransaction={onAddTransaction} key={0} />
                        },
                        {
                            menuItem: "Income",
                            render: () => <AddTransaction categories={props.user.income} onAddTransaction={onAddTransaction} key={1} />
                        }
                    ]} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                    <Header>Recent Transactions</Header>
                    <RecentTransactions transactions={props.user.transactions} categoryInfo={props.user.categoryInfo} show={5} />
                </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment className="upcoming-transactions">
                    <Header>Upcoming Transactions</Header>
                    <UpcomingTransactions transactions={props.user.upcomingTransactions} categoryInfo={props.user.categoryInfo} onPayTransaction={onPayTransaction} onDeleteTransaction={onDeleteTransaction} detail={false} />
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
