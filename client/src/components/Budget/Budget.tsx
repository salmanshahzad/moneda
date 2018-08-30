import React from "react";
import { User } from "../../user";
import { Grid, Segment, Header } from "semantic-ui-react";
import ExpenseChart from "./ExpenseChart";
import CategoryItem from "./CategoryItem";

interface BudgetProps {
    user: User;
    onUpdate: () => void;
}

export default (props: BudgetProps): JSX.Element => (
    <Grid style={{ padding: "1rem" }}>
        <Grid.Column mobile={16} tablet={16} computer={16}>
            <Header as="h1">Budget</Header>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment style={{ height: "50vh" }}>
                {/* need marginTop because for some reason Header has an extra margin when it is placed before a chart */}
                <Header style={{ marginTop: "-.14285714em" }}>Expenses Chart</Header>
                <ExpenseChart expenses={props.user.expenses} />
            </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
            <Segment>
                <Header>Income</Header>
                {
                    props.user.income.map((income, i) => <CategoryItem category={income} key={i} />)
                }
            </Segment>
            <Segment>
                <Header>Expenses</Header>
                {
                    props.user.expenses.map((expense, i) => <CategoryItem category={expense} key={i} />)
                }
            </Segment>
        </Grid.Column>
    </Grid>
);
