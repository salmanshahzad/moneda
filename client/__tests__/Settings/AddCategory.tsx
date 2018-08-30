import React from "react";
import { mount } from "enzyme";
import AddCategory from "../../src/components/Settings/AddCategory";
import { Grid, Button, Input, Message } from "semantic-ui-react";

describe("AddCategory", () => {
    const wrapper = mount(<AddCategory type="income" onAddCategory={jest.fn(() => new Promise<{}>((resolve, reject) => { }))} onCancel={jest.fn()} />);

    it("renders", () => {
        expect(wrapper.find(Grid)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("colour")).toBe("#FF0000");
        expect(wrapper.state("name")).toBe("");
        expect(wrapper.state("budget")).toBe("0");
        expect(wrapper.state("error")).toBe("");
    });

    it("changes the state when an input value changes", () => {
        wrapper.find(Input).find("input").simulate("change", { target: { value: "Test" } });
        expect(wrapper.state("name")).toBe("Test");
    });

    it("displays errors", () => {
        wrapper.setState({ error: "Error" });
        expect(wrapper.find(Message).text()).toBe("Error");
    });

    it("calls onAddCategory when the save button is clicked", () => {
        wrapper.setState({ name: "Test", colour: "#00FF00" });
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.prop("onAddCategory")).toHaveBeenCalledWith("Test", "income", "#00FF00", 0);
    });

    it("calls onCancel when the cancel button is clicked", () => {
        wrapper.find(Button).at(1).simulate("click");
        expect(wrapper.prop("onCancel")).toHaveBeenCalled();
    });
});
