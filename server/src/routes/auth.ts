import * as express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
    // validate
    const errors = {
        usernameError: "",
        passwordError: "",
        confirmPasswordError: ""
    };
    if (typeof req.body.username === "undefined" || req.body.username.length < 5) {
        errors.usernameError = "Please enter a username with at least 5 characters."
    }
    if (typeof req.body.password === "undefined" || req.body.password.length < 8) {
        errors.passwordError = "Please enter a password with at least 8 characters."
    } else if (typeof req.body.confirmPassword === "undefined" || req.body.confirmPassword !== req.body.password) {
        errors.confirmPasswordError = "Passwords do not match.";
    }

    if (errors.usernameError === "" && errors.passwordError === "" && errors.confirmPasswordError === "") {
        res.sendStatus(200);
    } else {
        res.status(400).send(errors);
    }
});

export default router;
