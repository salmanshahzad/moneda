import React from "react";
import { mount } from "enzyme";
import UserInformation from "../../src/components/Settings/UserInformation";
import testUser from "../testUser";
import { Form, Message } from "semantic-ui-react";

describe("UserInformation", () => {
    const wrapper = mount(<UserInformation user={testUser} onUpdateUserInformation={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
        expect(wrapper.find(Form.Field)).toHaveLength(4);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("username")).toBe("test");
        expect(wrapper.state("password")).toBe("");
        expect(wrapper.state("confirmPassword")).toBe("");
        expect(wrapper.state("currentPassword")).toBe("");
        expect(wrapper.state("errors")).toEqual([]);
    });

    it("changes the state when an input value changes", () => {
        wrapper.find("input").at(0).simulate("change", {target: {value: "testUsername"}});
        expect(wrapper.state("username")).toBe("testUsername");
        wrapper.find("input").at(1).simulate("change", {target: {value: "testPassword"}});
        expect(wrapper.state("password")).toBe("testPassword");
        wrapper.find("input").at(2).simulate("change", {target: {value: "testConfirmPassword"}});
        expect(wrapper.state("confirmPassword")).toBe("testConfirmPassword");
        wrapper.find("input").at(3).simulate("change", {target: {value: "testCurrentPassword"}});
        expect(wrapper.state("currentPassword")).toBe("testCurrentPassword");
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

    it("calls onUpdateUserInformation when the form is submitted", () => {
        wrapper.setState({username: "test12345", password: "test12345", confirmPassword: "test12345", currentPassword: "test12345"});
        wrapper.find(Form).simulate("submit");
        expect(wrapper.prop("onUpdateUserInformation")).toHaveBeenCalledWith("test12345", "test12345", "test12345", "test12345");
    });
});
