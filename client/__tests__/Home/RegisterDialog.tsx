import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import RegisterDialog from "../../src/components/Home/RegisterDialog";
import { Button, Message, Form } from "semantic-ui-react";

describe("RegisterDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeAll(() => {
        wrapper = mount(<RegisterDialog onRegister={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);
    });

    it("renders", () => {
        expect(wrapper.find("input")).toHaveLength(3);
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

    it("displays errors", () => {
        expect(wrapper.find(Message.Item)).toHaveLength(0);
        wrapper.setState({errors: ["test error 1", "test error 2"]});
        expect(wrapper.find(Message.Item)).toHaveLength(2);
        expect(wrapper.find(Message.Item).at(0).text()).toBe("test error 1");
        expect(wrapper.find(Message.Item).at(1).text()).toBe("test error 2");
        wrapper.setState({errors: []});
        expect(wrapper.find(Message.Item)).toHaveLength(0);
    });

    it("calls onRegister when the form is submitted", () => {
        wrapper.setState({username: "test12345", password: "test12345", confirmPassword: "test12345"});
        wrapper.find(Form).simulate("submit");
        expect(wrapper.prop("onRegister")).toHaveBeenCalledWith("test12345", "test12345", "test12345");
    });
});
