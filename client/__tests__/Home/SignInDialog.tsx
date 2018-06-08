import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import SignInDialog from "../../src/components/Home/SignInDialog";
import { Input, Button } from "semantic-ui-react";

describe("SignInDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeAll(() => {
        wrapper = mount(<SignInDialog />);
    });

    it("renders", () => {
        expect(wrapper.find(Input)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("username")).toBe("");
        expect(wrapper.state("password")).toBe("");
    });

    it("changes the state when an input value changes", () => {
        wrapper.find("input").at(0).simulate("change", {target: {value: "testUsername"}});
        expect(wrapper.state("username")).toBe("testUsername");
        wrapper.find("input").at(1).simulate("change", {target: {value: "testPassword"}});
        expect(wrapper.state("password")).toBe("testPassword");
    });
});
