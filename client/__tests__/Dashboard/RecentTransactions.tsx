import React from "react";
import { mount } from "enzyme";
import "../config";
import { MemoryRouter } from "react-router-dom";
import RecentTransactions from "../../src/components/Dashboard/RecentTransactions";
import { Table } from "semantic-ui-react";

describe("RecentTransactions", () => {
    const transactions = [
        {
            amount: 0,
            account: "test1",
            note: "",
            date: 0
        },
        {
            amount: 0,
            account: "test2",
            note: "",
            date: 0
        },
        {
            amount: 5,
            account: "test3",
            note: "",
            date: 0
        }
    ];
    const wrapper = mount(<MemoryRouter><RecentTransactions transactions={transactions} show={1} /></MemoryRouter>);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });

    it("shows min(props.transactions.length, props.show) transactions", () => {
        expect(wrapper.find(Table.Row)).toHaveLength(2); // header + 1 row
    });

    it("shows transactions in reverse chronological order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(0).text()).toBe("test3");
    });
});
