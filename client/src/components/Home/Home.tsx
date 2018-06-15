import React from "react";
import axios from "axios";
import auth from "../../auth";
import { Redirect } from "react-router-dom";
import backgroundImage from "../../assets/home/bg_cropped_compressed.jpg";
import { Parallax } from "react-parallax";
import { Button, Grid } from "semantic-ui-react";
import Feature from "./Feature";
import SignInDialogModal from "./SignInDialogModal";
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
    signedIn: boolean;
    signInDialogOpen: boolean;
    registerDialogOpen: boolean;
}

export default class Home extends React.Component<{}, HomeState> {
    state: HomeState = {
        signedIn: false,
        signInDialogOpen: false,
        registerDialogOpen: false
    };

    toggleSignInDialog = () => {
        this.setState({signInDialogOpen: !this.state.signInDialogOpen});
    };

    toggleRegisterDialog = () => {
        this.setState({registerDialogOpen: !this.state.registerDialogOpen});
    };

    onRegister = (username: string, password: string, confirmPassword: string) => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/register", {username, password, confirmPassword});
                await auth.signIn(username, password);
                resolve();
                this.setState({signedIn: true});
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    onSignIn = (username: string, password: string) => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                await axios.post("/api/sign_in", {username, password});
                await auth.signIn(username, password);
                resolve();
                this.setState({signedIn: true});
            } catch (e) {
                reject(e.response.data);
            }
        });
    };

    render(): React.ReactNode {
        if (this.state.signedIn) {
            return <Redirect to="/dashboard" />;
        }
        return (
            // flex, flexColumn, minHeight needed for sticky footer
            <div style={{display: "flex", flexDirection: "column", minHeight: "100%"}}>
                <Parallax bgImage={backgroundImage} bgImageAlt="Moneda" strength={500} blur={3}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1>Moneda</h1>
                        <h2>Personal Finance Application</h2>
                        <div>
                            <Button onClick={this.toggleSignInDialog}>Sign In</Button>
                            <Button onClick={this.toggleRegisterDialog}>Register</Button>
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
                <SignInDialogModal open={this.state.signInDialogOpen} onClose={this.toggleSignInDialog} onSignIn={this.onSignIn} />
                <RegisterDialogModal open={this.state.registerDialogOpen} onClose={this.toggleRegisterDialog} onRegister={this.onRegister} />
            </div>
        );
    }
}
