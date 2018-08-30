import React from "react";
import { mount } from "enzyme";
import UserInformation from "../../src/components/Settings/UserInformation";
import testUser from "../testUser";
import { Form, Message } from "semantic-ui-react";

describe("UserInformation", () => {
    const wrapper = mount(<UserInformation user={testUser} onUpdateUserInformation={jest.fn(() => new Promise<{}>((resolve, reject) => { }))} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
        expect(wrapper.find(Form.Field)).toHaveLength(4);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("username")).toBe("test");
        expect(wrapper.state("newPassword")).toBe("");
        expect(wrapper.state("confirmNewPassword")).toBe("");
        expect(wrapper.state("currentPassword")).toBe("");
        expect(wrapper.state("errors")).toEqual([]);
        expect(wrapper.state("successMessage")).toBe("");
    });

    it("changes the state when an input value changes", () => {
        wrapper.find("input").at(0).simulate("change", { target: { value: "testUsername" } });
        expect(wrapper.state("username")).toBe("testUsername");
        wrapper.find("input").at(1).simulate("change", { target: { value: "testNewPassword" } });
        expect(wrapper.state("newPassword")).toBe("testNewPassword");
        wrapper.find("input").at(2).simulate("change", { target: { value: "testConfirmNewPassword" } });
        expect(wrapper.state("confirmNewPassword")).toBe("testConfirmNewPassword");
        wrapper.find("input").at(3).simulate("change", { target: { value: "testCurrentPassword" } });
        expect(wrapper.state("currentPassword")).toBe("testCurrentPassword");
    });

    it("displays errors", () => {
        expect(wrapper.find(Message).at(0).find(Message.Item)).toHaveLength(0);
        wrapper.setState({ errors: ["test error 1", "test error 2"] });
        expect(wrapper.find(Message).at(0).find(Message.Item)).toHaveLength(2);
        expect(wrapper.find(Message.Item).at(0).text()).toBe("test error 1");
        expect(wrapper.find(Message.Item).at(1).text()).toBe("test error 2");
        wrapper.setState({ errors: [] });
        expect(wrapper.find(Message).at(0).find(Message.Item)).toHaveLength(0);
    });

    it("displays success messages", () => {
        wrapper.setState({ errors: [], successMessage: "Success" });
        expect(wrapper.find(Message).at(0).find(Message.Item)).toHaveLength(0);
        expect(wrapper.find(Message).at(1).text()).toContain("Success"); // not toBe because Message header is also Success
    });

    it("calls onUpdateUserInformation when the form is submitted", () => {
        wrapper.setState({ username: "test12345", newPassword: "test12345", confirmNewPassword: "test12345", currentPassword: "test12345" });
        wrapper.find(Form).simulate("submit");
        expect(wrapper.prop("onUpdateUserInformation")).toHaveBeenCalledWith("test12345", "test12345", "test12345", "test12345");
    });
});
