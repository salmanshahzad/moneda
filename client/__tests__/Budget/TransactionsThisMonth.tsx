import React from "react";
import { mount } from "enzyme";
import TransactionsThisMonth from "../../src/components/Budget/TransactionsThisMonth";
import { Table } from "semantic-ui-react";

describe("TransactionsThisMonth", () => {
    const transactions = [
        {
            amount: 0,
            account: "test1",
            note: "",
            date: new Date(2018, 0, 1).getTime()
        },
        {
            amount: 0,
            account: "test2",
            note: "",
            date: new Date(2018, 5, 1).getTime()
        },
        {
            amount: 5,
            account: "test3",
            note: "",
            date: new Date(2018, 5, 2).getTime()
        }
    ];
    const wrapper = mount(<TransactionsThisMonth transactions={transactions} show={3} />);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });

    it("shows min(transactionsThisMonth.length, props.show) transactions", () => {
        expect(wrapper.find(Table.Row)).toHaveLength(3); // header + 2 rows
    });

    it("shows transactions in reverse chronological order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(1).text()).toBe("$5.00");
    });
});
