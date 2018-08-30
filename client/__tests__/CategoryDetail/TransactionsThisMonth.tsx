import React from "react";
import { mount } from "enzyme";
import TransactionsThisMonth from "../../src/components/CategoryDetail/TransactionsThisMonth";
import testUser from "../testUser";
import { Table } from "semantic-ui-react";

describe("TransactionsThisMonth", () => {
    const wrapper = mount(<TransactionsThisMonth transactions={testUser.transactions} onDeleteTransaction={jest.fn()} />);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
        expect(wrapper.find(Table.Row)).toHaveLength(3); // header + 2 transactions
    });

    it("shows transactions in order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(1).text()).toBe("$3.00");
        expect(wrapper.find(Table.Row).at(2).find(Table.Cell).at(1).text()).toBe("$2.00");
    });
});
