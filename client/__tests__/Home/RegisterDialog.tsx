import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import RegisterDialog from "../../src/components/Home/RegisterDialog";
import { Input, Button } from "semantic-ui-react";

describe("RegisterDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeAll(() => {
        wrapper = mount(<RegisterDialog />);
    });

    it("renders", () => {
        expect(wrapper.find(Input)).toHaveLength(3);
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("username")).toBe("");
        expect(wrapper.state("password")).toBe("");
        expect(wrapper.state("confirmPassword")).toBe("");
    });

    it("changes the state when an input value changes", () => {
        wrapper.find("input").at(0).simulate("change", {target: {value: "testUsername"}});
        expect(wrapper.state("username")).toBe("testUsername");
        wrapper.find("input").at(1).simulate("change", {target: {value: "testPassword"}});
        expect(wrapper.state("password")).toBe("testPassword");
        wrapper.find("input").at(2).simulate("change", {target: {value: "testConfirmPassword"}});
        expect(wrapper.state("confirmPassword")).toBe("testConfirmPassword");
    });
});
