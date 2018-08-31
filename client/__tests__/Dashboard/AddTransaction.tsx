import React from "react";
import { mount } from "enzyme";
import AddTransaction from "../../src/components/Dashboard/AddTransaction";
import testUser from "../testUser";
import { Form, Message } from "semantic-ui-react";
import moment from "moment";

describe("AddTransaction", () => {
    const wrapper = mount(<AddTransaction categories={testUser.expenses} onAddTransaction={jest.fn(() => new Promise<{}>((resolve, reject) => { }))} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("categoryId")).toBe("2");
        expect(wrapper.state("amount")).toBe("0.00");
        expect(wrapper.state("note")).toBe("");
        expect(wrapper.state("date")).toBeInstanceOf(moment);
        expect(wrapper.state("errors")).toEqual([]);
    });

    it("changes the state when an input value changes", () => {
        // cannot test Select onChange because Select does not render a HTML select element
        // wrapper.find(Select).simulate("change", {target: {value: "Food"}});
        // expect(wrapper.state("name")).toBe("Food");
        wrapper.find("input").at(0).simulate("change", { target: { value: "5.00" } });
        expect(wrapper.state("amount")).toBe("5.00");
        wrapper.find("input").at(1).simulate("change", { target: { value: "Test" } });
        expect(wrapper.state("note")).toBe("Test");
    });

    it("displays errors", () => {
        expect(wrapper.find(Message.Item)).toHaveLength(0);
        wrapper.setState({ errors: ["test error 1", "test error 2"] });
        expect(wrapper.find(Message.Item)).toHaveLength(2);
        expect(wrapper.find(Message.Item).at(0).text()).toBe("test error 1");
        expect(wrapper.find(Message.Item).at(1).text()).toBe("test error 2");
        wrapper.setState({ errors: [] });
        expect(wrapper.find(Message.Item)).toHaveLength(0);
    });

    it("calls onAddTransaction when the form is submitted", () => {
        wrapper.setState({ categoryId: "3", amount: "5.00", note: "Test" });
        wrapper.find(Form).simulate("submit");
        // cannot test that specific arguments have been passed because the date will not match
        expect(wrapper.prop("onAddTransaction")).toBeCalled();
    });
});
