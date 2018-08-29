import React from "react";
import { mount } from "enzyme";
import TransactionsThisMonth from "../../src/components/Budget/TransactionsThisMonth";
import testUser from "../testUser";
import { Table } from "semantic-ui-react";

describe("TransactionsThisMonth", () => {
    const wrapper = mount(<TransactionsThisMonth transactions={testUser.transactions} show={3} onDeleteTransaction={jest.fn()} />);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });

    it("shows min(transactionsThisMonth.length, props.show) transactions", () => {
        expect(wrapper.find(Table.Row)).toHaveLength(3); // header + 2 rows
    });

    it("shows transactions in order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(1).text()).toBe("$3.00");
        expect(wrapper.find(Table.Row).at(2).find(Table.Cell).at(1).text()).toBe("$2.00");
    });
});
