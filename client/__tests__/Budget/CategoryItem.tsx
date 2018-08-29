import React from "react";
import { mount } from "enzyme";
import CategoryItem from "../../src/components/Budget/CategoryItem";
import testUser from "../testUser";
import routerContext from "../routerContext";
import { Link } from "react-router-dom";
import ProgressBar from "../../src/components/General/ProgressBar";

describe("CategoryItem", () => {
    const wrapper = mount(<CategoryItem category={testUser.income[0]} />, routerContext);

    it("shows income information correctly", () => {
        expect(wrapper.find(Link).prop("to")).toBe("/income/Test Income 1");
        expect(wrapper.find(Link).text()).toBe("Test Income 1");
        expect(wrapper.find("span").text()).toBe("$0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(0);
    });

    it("shows expense information correctly", () => {
        wrapper.setProps({category: testUser.expenses[0]});
        expect(wrapper.find(Link).prop("to")).toBe("/expense/Test Expense 1");
        expect(wrapper.find(Link).text()).toBe("Test Expense 1");
        expect(wrapper.find("span").text()).toBe("$0.00 of $0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });
});
