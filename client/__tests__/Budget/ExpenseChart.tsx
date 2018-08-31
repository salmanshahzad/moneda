import React from "react";
import { mount } from "enzyme";
import ExpenseChart from "../../src/components/Budget/ExpenseChart";
import testUser from "../testUser";
import { Pie } from "react-chartjs-2";

describe("ExpenseChart", () => {
    it("renders", () => {
        const wrapper = mount(<ExpenseChart expenses={testUser.expenses} />);
        expect(wrapper.find(Pie)).toHaveLength(1);
    });
});
