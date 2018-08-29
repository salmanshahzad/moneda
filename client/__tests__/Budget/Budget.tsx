import React from "react";
import { mount } from "enzyme";
import Budget from "../../src/components/Budget/Budget";
import testUser from "../testUser";
import routerContext from "../routerContext";
import ExpenseChart from "../../src/components/Budget/ExpenseChart";
import CategoryItem from "../../src/components/Budget/CategoryItem";

describe("Budget", () => {
    const wrapper = mount(<Budget user={testUser} onUpdate={jest.fn()} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(ExpenseChart)).toHaveLength(1);
        expect(wrapper.find(CategoryItem)).toHaveLength(3); // 1 income + 2 expenses
    });
});
