import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface ExpenseItemProps {
    name: string;
    spent: number;
    budget: number;
}

const textStyle: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "bold"
};

export default (props: ExpenseItemProps) => (
    <React.Fragment>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Link to={"/expense/" + props.name} style={textStyle}>{props.name}</Link>
            <span style={textStyle}>${props.spent.toFixed(2)} of ${props.budget.toFixed(2)}</span>
        </div>
        <ProgressBar value={props.spent} total={props.budget} />
    </React.Fragment>
)
