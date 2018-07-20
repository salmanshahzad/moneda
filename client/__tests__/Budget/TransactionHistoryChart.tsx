import React from "react";
import { mount } from "enzyme";
import TransactionHistoryChart from "../../src/components/Budget/TransactionHistoryChart";
import testUser from "../testUser";
import { Line } from "react-chartjs-2";

describe("TransactionHistoryChart", () => {
    it("renders", () => {
        const wrapper = mount(<TransactionHistoryChart account={testUser.expenses[0]} transactions={[]} monthsToShow={6} />);
        expect(wrapper.find(Line)).toHaveLength(1);
    });
});
