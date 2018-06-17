import React from "react";
import { Link } from "react-router-dom";
import { SemanticCOLORS, Progress } from "semantic-ui-react";

interface ExpenseItemProps {
    name: string;
    spent: number;
    budget: number;
}

const textStyle: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "bold"
};

export default (props: ExpenseItemProps) => {
    const progressColour = (): SemanticCOLORS => {
        if (props.budget === 0) {
            if (props.spent === 0) {
                return "green";
            } else {
                return "red";
            }
        }
        const percentage = props.spent / props.budget * 100;
        if (percentage >= 100) {
            return "red";
        } else if (percentage < 75) {
            return "green";
        } else {
            return "yellow";
        }
    };
    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to={"/expense/" + props.name} style={textStyle}>{props.name}</Link>
                <span style={textStyle}>${props.spent.toFixed(2)} of ${props.budget.toFixed(2)}</span>
            </div>
            <Progress value={props.spent} total={props.budget} progress="percent" color={progressColour()} style={{margin: "0.8em 0"}} />
        </React.Fragment>
    );
}
