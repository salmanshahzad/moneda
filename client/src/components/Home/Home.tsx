import React from "react";
import backgroundImage from "../../assets/home/bg_cropped_compressed.jpg";
import { Parallax } from "react-parallax";
import { Button, Grid } from "semantic-ui-react";
import Feature from "./Feature";
import SignInDialog from "./SignInDialog";
import RegisterDialogModal from "./RegisterDialogModal";

const features = [
    {
        title: "Feature 1",
        body: "Description."
    },
    {
        title: "Feature 2",
        body: "Description."
    },
    {
        title: "Feature 3",
        body: "Description."
    }
];

interface HomeState {
    signInDialogOpen: boolean;
    registerDialogOpen: boolean;
}

export default class Home extends React.Component<{}, HomeState> {
    state: HomeState = {
        signInDialogOpen: false,
        registerDialogOpen: false
    };

    toggleSignInDialog = () => {
        this.setState({signInDialogOpen: !this.state.signInDialogOpen});
    };

    toggleRegisterDialog = () => {
        this.setState({registerDialogOpen: !this.state.registerDialogOpen});
    };

    render(): React.ReactNode {
        return (
            // flex, flexColumn, minHeight needed for sticky footer
            <div style={{display: "flex", flexDirection: "column", minHeight: "100%", overflowX: "hidden"}}>
                <Parallax bgImage={backgroundImage} bgImageAlt="Moneda" strength={500} blur={3}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1>Moneda</h1>
                        <h2>Personal Finance Application</h2>
                        <div>
                            <Button className="signIn" onClick={this.toggleSignInDialog}>Sign In</Button>
                            <Button className="register" onClick={this.toggleRegisterDialog}>Register</Button>
                        </div>
                    </div>
                </Parallax>
                <Grid>
                    {
                        features.map((feature, i) => (
                            <Grid.Column mobile={16} computer={4} key={i}>
                                <Feature title={feature.title} body={feature.body} />
                            </Grid.Column>
                        ))
                    }
                </Grid>
                <footer style={{backgroundColor: "gainsboro", padding: "1em"}}>
                    <p>&copy;2018 Salman</p>
                </footer>
                <SignInDialog open={this.state.signInDialogOpen} close={this.toggleSignInDialog} />
                <RegisterDialogModal open={this.state.registerDialogOpen} onClose={this.toggleRegisterDialog} />
            </div>
        );
    }
}
