import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import { Link } from "react-router-dom";
import ExpenseItem from "../../src/components/Budget/ExpenseItem";
import { Progress } from "semantic-ui-react";

describe("ExpenseItem", () => {
    const wrapper = mount(<ExpenseItem name="Test" spent={1} budget={2} />, routerContext);

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
        wrapper.setProps({spent: 1.5});
        expect(wrapper.find(Progress).prop("color")).toBe("yellow");
        wrapper.setProps({spent: 2});
        expect(wrapper.find(Progress).prop("color")).toBe("red");
        wrapper.setProps({spent: 0, budget: 0});
        expect(wrapper.find(Progress).prop("color")).toBe("green");
        wrapper.setProps({spent: 1});
        expect(wrapper.find(Progress).prop("color")).toBe("red");
    });
});
