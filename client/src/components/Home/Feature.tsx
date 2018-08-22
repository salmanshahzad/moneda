import React from "react";
import { Grid, Image, Icon, SemanticICONS, Header } from "semantic-ui-react";

interface FeatureProps {
    image: any;
    icon: string;
    content: string;
    alignRight?: boolean;
}

export default (props: FeatureProps) => {
    const columns = (
        <React.Fragment>
            <Grid.Column mobile={16} tablet={16} computer={8}>
                <Image src={props.image} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8} verticalAlign="middle">
                <Icon name={props.icon as SemanticICONS} size="large" />
                <Header size="huge">{props.content}</Header>
            </Grid.Column>
        </React.Fragment>
    );

    // reversed prop on Grid cannot be ""
    return props.alignRight ? <Grid reversed="computer" style={{padding: "1rem"}}>{columns}</Grid> : <Grid style={{padding: "1rem"}}>{columns}</Grid>
}
