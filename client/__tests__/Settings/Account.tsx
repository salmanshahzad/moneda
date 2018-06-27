import React from "react";
import { mount } from "enzyme";
import Account from "../../src/components/Settings/Account";
import testUser from "../testUser";
import { Grid, Button, Input, Message } from "semantic-ui-react";
import { SketchPicker } from "react-color";

describe("Account", () => {
    const emptyPromise = jest.fn(() => new Promise<{}>((resolve, reject) => {}));
    const wrapper = mount(<Account type="income" account={testUser.income[0]} onUpdateAccount={emptyPromise} onDeleteAccount={emptyPromise} />);

    it("renders", () => {
        expect(wrapper.find(Grid)).toHaveLength(1);
    });

    it("has the correct intial state", () => {
        expect(wrapper.state("colour")).toBe("#FF0000");
        expect(wrapper.state("name")).toBe("Test Income 1");
        expect(wrapper.state("budget")).toBe("0");
        expect(wrapper.state("editing")).toBe(false);
        expect(wrapper.state("error")).toBe("");
    });

    it("toggles the editing state when the edit or save button is clicked", () => {
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.state("editing")).toBe(true);
        expect(wrapper.find(SketchPicker)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("changes the state when an input value changes", () => {
        wrapper.setState({editing: true});
        wrapper.find(Input).find("input").simulate("change", {target: {value: "Test"}});
        expect(wrapper.state("name")).toBe("Test");
    });

    it("displays errors", () => {
        wrapper.setState({editing: true, error: "Error"});
        expect(wrapper.find(Message).text()).toBe("Error");
    });

    it("calls onUpdateAccount when the save button is clicked", () => {
        wrapper.setState({editing: true, name: "Test", colour: "#00FF00"});
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.prop("onUpdateAccount")).toHaveBeenCalledWith("income", "1", "Test", "#00FF00", 0);
    });

    it("calls onDelete when the delete button is clicked", () => {
        wrapper.setState({editing: false});
        wrapper.find(Button).at(1).simulate("click");
        expect(wrapper.prop("onDeleteAccount")).toHaveBeenCalledWith("income", "1");
    });
});
