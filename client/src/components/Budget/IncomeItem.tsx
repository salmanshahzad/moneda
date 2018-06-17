import React from "react";
import { Link } from "react-router-dom";

interface IncomeItemProps {
    name: string;
    amount: number;
    percentage: number;
}

const textStyle: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "bold"
};

export default (props: IncomeItemProps) => (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <Link to={"/income/" + props.name} style={textStyle}>{props.name}</Link>
        <span style={textStyle}>${props.amount.toFixed(2)} ({props.percentage.toFixed(1)}%)</span>
    </div>
);
