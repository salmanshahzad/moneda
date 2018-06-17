import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Budget from "../../src/components/Budget/Budget";
import testUser from "../testUser";
import ExpenseChart from "../../src/components/Budget/ExpenseChart";
import IncomeItem from "../../src/components/Budget/IncomeItem";
import ExpenseItem from "../../src/components/Budget/ExpenseItem";

describe("Budget", () => {
    it("renders", () => {
        const wrapper = mount(<MemoryRouter><Budget user={testUser} onUpdate={jest.fn()} /></MemoryRouter>);
        expect(wrapper.find(ExpenseChart)).toHaveLength(1);
        expect(wrapper.find(IncomeItem)).toHaveLength(1);
        expect(wrapper.find(ExpenseItem)).toHaveLength(2);
    });
});
