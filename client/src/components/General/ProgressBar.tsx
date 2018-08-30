import React from "react";
import { SemanticCOLORS, Progress } from "semantic-ui-react";

interface ProgressBarProps {
    value: number;
    total: number;
}

export default (props: ProgressBarProps) => {
    const getPercent = (): number => {
        // need this function to round to 1 decimal place otherwise Progress component may show e.g. 7.00000001%
        return parseFloat((props.value / props.total * 100).toFixed(1));
    };

    const getColour = (): SemanticCOLORS => {
        if (props.total === 0) {
            if (props.value === 0) {
                return "green";
            } else {
                return "red";
            }
        }
        const percentage = props.value / props.total * 100;
        if (percentage >= 100) {
            return "red";
        } else if (percentage < 75) {
            return "green";
        } else {
            return "yellow";
        }
    };
    return <Progress percent={getPercent()} progress color={getColour()} style={{ margin: "0.8em 0" }} />;
}
