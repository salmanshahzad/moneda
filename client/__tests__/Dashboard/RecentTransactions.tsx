import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import RecentTransactions from "../../src/components/Dashboard/RecentTransactions";
import testUser from "../testUser";
import { Table } from "semantic-ui-react";

describe("RecentTransactions", () => {
    const categoryInfo = (id: string): {type: string, name: string} => {
        return {
            type: "expense",
            name: `test${id}`
        };
    };
    const wrapper = mount(<RecentTransactions transactions={testUser.transactions} categoryInfo={categoryInfo} show={1} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });

    it("shows min(props.transactions.length, props.show) transactions", () => {
        expect(wrapper.find(Table.Row)).toHaveLength(2); // header + 1 row
    });

    it("shows transactions in order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(0).text()).toBe("test1");
    });
});
