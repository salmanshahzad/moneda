import React from "react";
import { mount } from "enzyme";
import "../config";
import AddIncomeTransaction from "../../src/components/Dashboard/AddIncomeTransaction";
import { Form, Message } from "semantic-ui-react";

describe("AddIncomeTransaction", () => {
    const wrapper = mount(<AddIncomeTransaction incomeNames={["Primary Income", "Secondary Income"]} onAddIncomeTransaction={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("name")).toBe("Primary Income");
        expect(wrapper.state("amount")).toBe("0.00");
        expect(wrapper.state("note")).toBe("");
    });

    it("changes the state when an input value changes", () => {
        // cannot test Select onChange because Select does not render a HTML select element
        // wrapper.find(Select).simulate("change", {target: {value: "Secondary Income"}});
        // expect(wrapper.state("name")).toBe("Secondary Income");
        wrapper.find("input").at(0).simulate("change", {target: {value: "5.00"}});
        expect(wrapper.state("amount")).toBe("5.00");
        wrapper.find("input").at(1).simulate("change", {target: {value: "Test"}});
        expect(wrapper.state("note")).toBe("Test");
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

    it("calls onAddIncomeTransaction when the form is submitted", () => {
        wrapper.setState({name: "Primary Income", amount: "5.00", note: "Test"});
        wrapper.find(Form).simulate("submit");
        expect(wrapper.prop("onAddIncomeTransaction")).toHaveBeenCalledWith("Primary Income", 5, "Test");
    });
});
