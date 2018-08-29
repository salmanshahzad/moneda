import React from "react";
import { Category, Income, Expense } from "../../user";
import { Link } from "react-router-dom";
import ProgressBar from "../General/ProgressBar";

interface CategoryItemProps {
    category: Category;
}

export default (props: CategoryItemProps) => {
    const textStyle: React.CSSProperties = {
        fontStyle: "italic",
        fontWeight: "bold"
    };

    return (
        <React.Fragment>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link to={`/${props.category.type}/${props.category.name}`} style={textStyle}>{props.category.name}</Link>
                {
                    props.category.type === "income" &&
                    <span style={textStyle}>${(props.category as Income).income.toFixed(2)}</span>
                }
                {
                    props.category.type === "expense" &&
                    <span style={textStyle}>${(props.category as Expense).spent.toFixed(2)} of ${(props.category as Expense).budget.toFixed(2)}</span>
                }
            </div>
            {
                props.category.type === "expense" &&
                <ProgressBar value={(props.category as Expense).spent} total={(props.category as Expense).budget} />
            }
        </React.Fragment>
    );
}
