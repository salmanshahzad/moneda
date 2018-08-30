import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import UpcomingTransactions from "../../src/components/Dashboard/UpcomingTransactions";
import testUser from "../testUser";
import { Table, Button } from "semantic-ui-react";

describe("UpcomingTransactions", () => {
    const categoryInfo = (id: string): { type: string, name: string } => {
        return {
            type: "expense",
            name: `test${id}`
        };
    };
    const emptyFunction = jest.fn();
    const wrapper = mount(<UpcomingTransactions transactions={testUser.upcomingTransactions} categoryInfo={categoryInfo} onPayTransaction={emptyFunction} onDeleteTransaction={emptyFunction} detail={true} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
    });

    it("shows transactions in order", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(1).text()).toBe("$4.00");
    });

    it("shows the transaction note if props.detail is true", () => {
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(2).text()).toBe("Test 4");
        wrapper.setProps({ detail: false });
        expect(wrapper.find(Table.Row).at(1).find(Table.Cell).at(2).text()).toBe("$4.00");
    });

    it("calls props.onPayTransaction when the Paid button is clicked", () => {
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.prop("onPayTransaction")).toBeCalledWith("4");
    });
});
