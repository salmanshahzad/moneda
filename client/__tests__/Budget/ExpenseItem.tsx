import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import { Link } from "react-router-dom";
import ExpenseItem from "../../src/components/Budget/ExpenseItem";
import ProgressBar from "../../src/components/Budget/ProgressBar";

describe("ExpenseItem", () => {
    const wrapper = mount(<ExpenseItem name="Test" spent={1} budget={2} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });

    it("formats the information correctly", () => {
        expect(wrapper.find(Link).prop("to")).toBe("/expense/Test");
        expect(wrapper.find(Link).text()).toBe("Test");
        expect(wrapper.find("span").text()).toBe("$1.00 of $2.00");
        expect(wrapper.find(ProgressBar).prop("value")).toBe(1);
        expect(wrapper.find(ProgressBar).prop("total")).toBe(2);
    });
});
