import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Link } from "react-router-dom";
import ExpenseItem from "../../src/components/Budget/ExpenseItem";
import { Progress } from "semantic-ui-react";

describe("ExpenseItem", () => {
    let wrapper = mount(<MemoryRouter><ExpenseItem name="Test" spent={1} budget={2} /></MemoryRouter>);

    it("renders", () => {
        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(Progress)).toHaveLength(1);
    });

    it("formats the information correctly", () => {
        expect(wrapper.find(Link).prop("to")).toBe("/expense/Test");
        expect(wrapper.find(Link).text()).toBe("Test");
        expect(wrapper.find("span").text()).toBe("$1.00 of $2.00");
        expect(wrapper.find(Progress).prop("value")).toBe(1);
        expect(wrapper.find(Progress).prop("total")).toBe(2);
    });

    it("has the correct colour for the Progress component", () => {
        expect(wrapper.find(Progress).prop("color")).toBe("green");
        wrapper = mount(<MemoryRouter><ExpenseItem name="Test" spent={1.5} budget={2} /></MemoryRouter>);
        expect(wrapper.find(Progress).prop("color")).toBe("yellow");
        wrapper = mount(<MemoryRouter><ExpenseItem name="Test" spent={2} budget={2} /></MemoryRouter>);
        expect(wrapper.find(Progress).prop("color")).toBe("red");
        wrapper = mount(<MemoryRouter><ExpenseItem name="Test" spent={0} budget={0} /></MemoryRouter>);
        expect(wrapper.find(Progress).prop("color")).toBe("green");
        wrapper = mount(<MemoryRouter><ExpenseItem name="Test" spent={1} budget={0} /></MemoryRouter>);
        expect(wrapper.find(Progress).prop("color")).toBe("red");
    });
});
