import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import Home from "../../src/components/Home/Home";
import Feature from "../../src/components/Home/Feature";

describe("Home", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeEach(() => {
        wrapper = mount(<Home />);
    });

    it("renders", () => {
        expect(wrapper.find(Feature)).toHaveLength(3);
    });

    it("opens the sign in dialog when the sign in button is pressed", () => {
        expect(wrapper.state("signInDialogOpen")).toBe(false);
        wrapper.find("button.signIn").simulate("click");
        expect(wrapper.state("signInDialogOpen")).toBe(true);
    });

    it("opens the register dialog when the register button is pressed", () => {
        expect(wrapper.state("registerDialogOpen")).toBe(false);
        wrapper.find("button.register").simulate("click");
        expect(wrapper.state("registerDialogOpen")).toBe(true);
    });
});
