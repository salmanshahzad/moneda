import React from "react";
import { mount } from "enzyme";
import Home from "../../src/components/Home/Home";
import Feature from "../../src/components/Home/Feature";
import { Button } from "semantic-ui-react";

describe("Home", () => {
    const wrapper = mount(<Home />);

    it("renders", () => {
        expect(wrapper.find(Feature)).toHaveLength(3);
    });

    it("opens the sign in dialog when the sign in button is pressed", () => {
        expect(wrapper.state("signInDialogOpen")).toBe(false);
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.state("signInDialogOpen")).toBe(true);
    });

    it("opens the register dialog when the register button is pressed", () => {
        expect(wrapper.state("registerDialogOpen")).toBe(false);
        wrapper.find(Button).at(1).simulate("click");
        expect(wrapper.state("registerDialogOpen")).toBe(true);
    });
});
