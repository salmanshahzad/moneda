import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import SignInDialog from "../../src/components/Home/SignInDialog";
import { Button, Message, Form } from "semantic-ui-react";

describe("SignInDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeAll(() => {
        wrapper = mount(<SignInDialog onSignIn={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);
    });

    it("renders", () => {
        expect(wrapper.find("input")).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("username")).toBe("");
        expect(wrapper.state("password")).toBe("");
        expect(wrapper.state("errors")).toEqual([]);
    });

    it("changes the state when an input value changes", () => {
        wrapper.find("input").at(0).simulate("change", {target: {value: "testUsername"}});
        expect(wrapper.state("username")).toBe("testUsername");
        wrapper.find("input").at(1).simulate("change", {target: {value: "testPassword"}});
        expect(wrapper.state("password")).toBe("testPassword");
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

    it("calls onSignIn when the form is submitted", () => {
        wrapper.setState({username: "test12345", password: "test12345"});
        wrapper.find(Form).simulate("submit");
        expect(wrapper.prop("onSignIn")).toHaveBeenCalledWith("test12345", "test12345");
    });
});
