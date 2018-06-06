import React from "react";
import { Item } from "semantic-ui-react";

interface FeatureProps {
    title: string;
    body: string;
}

export default (props: FeatureProps) => (
    <Item>
        <Item.Content>
            <Item.Header>{props.title}</Item.Header>
            <Item.Description>{props.body}</Item.Description>
        </Item.Content>
    </Item>
);
