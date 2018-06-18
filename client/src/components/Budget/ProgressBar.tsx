import React from "react";
import { SemanticCOLORS, Progress } from "semantic-ui-react";

interface ProgressBarProps {
    value: number;
    total: number;
}

export default (props: ProgressBarProps) => {
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
    return <Progress value={props.value} total={props.total} progress="percent" color={getColour()} style={{margin: "0.8em 0"}} />;
}
