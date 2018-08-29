import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Parallax } from "react-parallax";
import backgroundImage from "../../assets/home/bg_cropped_compressed.jpg";
import { Button } from "semantic-ui-react";
import Feature from "./Feature";
import budgetImage from "../../assets/home/features/budget-compressed.jpg";
import chartImage from "../../assets/home/features/chart-compressed.jpg";
import upcomingImage from "../../assets/home/features/upcoming-compressed.jpg";
import SignInDialogModal from "./SignInDialogModal";
import RegisterDialogModal from "./RegisterDialogModal";

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

    features = [
        {
            image: budgetImage,
            icon: "credit card outline",
            content: "Stay on top of your budget"
        },
        {
            image: chartImage,
            icon: "chart line",
            content: "Track your monthly spending"
        },
        {
            image: upcomingImage,
            icon: "calendar alternate",
            content: "Never miss upcoming payments"
        }
    ];

    toggleSignInDialog = () => {
        this.setState({signInDialogOpen: !this.state.signInDialogOpen});
    };

    toggleRegisterDialog = () => {
        this.setState({registerDialogOpen: !this.state.registerDialogOpen});
    };

    onRegister = (username: string, password: string, confirmPassword: string) => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/user", {username, password, confirmPassword});
                localStorage.setItem("token", response.data.token);
                resolve();
                this.setState({signedIn: true});
            } catch (e) {
                reject(e.response.data.errors);
            }
        });
    };

    onSignIn = (username: string, password: string) => {
        return new Promise<{}>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/session", {username, password});
                localStorage.setItem("token", response.data.token);
                resolve();
                this.setState({signedIn: true});
            } catch (e) {
                reject(e.response.data.errors);
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
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh"}}>
                        <h1 style={{fontSize: "5rem"}}>Moneda</h1>
                        <h2>Budgeting Made Easy</h2>
                        <Button.Group>
                            <Button primary onClick={this.toggleSignInDialog}>Sign In</Button>
                            <Button.Or />
                            <Button primary onClick={this.toggleRegisterDialog}>Register</Button>
                        </Button.Group>
                    </div>
                </Parallax>
                {
                    this.features.map((feature, i) => (
                        <Feature image={feature.image} icon={feature.icon} content={feature.content} alignRight={i % 2 === 1} key={i} />
                    ))
                }
                <footer style={{backgroundColor: "gainsboro", padding: "1em"}}>
                    <p>&copy;2018 Salman</p>
                </footer>
                <SignInDialogModal open={this.state.signInDialogOpen} onClose={this.toggleSignInDialog} onSignIn={this.onSignIn} />
                <RegisterDialogModal open={this.state.registerDialogOpen} onClose={this.toggleRegisterDialog} onRegister={this.onRegister} />
            </div>
        );
    }
}
