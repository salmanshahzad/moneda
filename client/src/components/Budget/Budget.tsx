import React from "react";
import { User } from "../../../../user";
import { Grid, Segment, Header } from "semantic-ui-react";
import ExpenseChart from "./ExpenseChart";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface BudgetProps {
    user: User;
    onUpdate: () => void;
}

const textStyle: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "bold"
};

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
                    props.user.income.map((income, i) => (
                        <div style={{display: "flex", justifyContent: "space-between"}} key={i}>
                            <Link to={"/income/" + income.name} style={textStyle}>{income.name}</Link>
                            <span style={textStyle}>${income.income.toFixed(2)}</span>
                        </div>
                    ))
                }
            </Segment>
            <Segment>
                <Header>Expenses</Header>
                {
                    props.user.expenses.map((expense, i) => (
                        <React.Fragment key={i}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <Link to={"/expense/" + expense.name} style={textStyle}>{expense.name}</Link>
                                <span style={textStyle}>${expense.spent.toFixed(2)} of ${expense.budget.toFixed(2)}</span>
                            </div>
                            <ProgressBar value={expense.spent} total={expense.budget} />
                        </React.Fragment>
                    ))
                }
            </Segment>
        </Grid.Column>
    </Grid>
);
