import React from "react";
import { mount } from "enzyme";
import Budget from "../../src/components/Budget/Budget";
import testUser from "../testUser";
import routerContext from "../routerContext";
import ExpenseChart from "../../src/components/Budget/ExpenseChart";
import { Link } from "react-router-dom";
import ProgressBar from "../../src/components/Budget/ProgressBar";

describe("Budget", () => {
    const wrapper = mount(<Budget user={testUser} onUpdate={jest.fn()} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(ExpenseChart)).toHaveLength(1);
        expect(wrapper.find(Link)).toHaveLength(3); // 1 income + 2 expenses
        expect(wrapper.find(ProgressBar)).toHaveLength(2); // 2 expenses
    });

    it("shows income information correctly", () => {
        expect(wrapper.find(Link).at(0).prop("to")).toBe("/income/Test Income 1");
        expect(wrapper.find(Link).at(0).text()).toBe("Test Income 1");
        expect(wrapper.find("span").at(0).text()).toBe("$0.00");
    });

    it("shows expense information correctly", () => {
        expect(wrapper.find(Link).at(1).prop("to")).toBe("/expense/Test Expense 1");
        expect(wrapper.find(Link).at(1).text()).toBe("Test Expense 1");
        expect(wrapper.find("span").at(1).text()).toBe("$0.00 of $0.00");
    });
});
