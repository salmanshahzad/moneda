import React from "react";
import { User } from "../../../../user";
import { Grid, Segment, Header } from "semantic-ui-react";
import ExpenseChart from "./ExpenseChart";
import IncomeItem from "./IncomeItem";
import ExpenseItem from "./ExpenseItem";

interface BudgetProps {
    user: User;
    onUpdate: () => void;
}

export default (props: BudgetProps) => (
    <Grid style={{padding: "1rem"}}>
        <Grid.Column mobile={16} tablet={16} computer={16}>
            <Header as="h1">Budget</Header>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment style={{height: "50vh"}}>
                {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                <Header style={{marginTop: "-.14285714em"}}>Expenses Chart</Header>
                <ExpenseChart expenses={props.user.expenses} />
            </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
                <Header>Income</Header>
                {
                    props.user.income.map((income, i) => <IncomeItem name={income.name} amount={income.income} percentage={0} key={i} />)
                }
            </Segment>
            <Segment>
                <Header>Expenses</Header>
                {
                    props.user.expenses.map((expense, i) => <ExpenseItem name={expense.name} spent={expense.spent} budget={expense.budget} key={i} />)
                }
            </Segment>
        </Grid.Column>
    </Grid>
);
