import React from "react";
import { mount } from "enzyme";
import Dashboard from "../../src/components/Dashboard/Dashboard";
import testUser from "../testUser";
import routerContext from "../routerContext";
import ExpenseChart from "../../src/components/Budget/ExpenseChart";
import { Tab } from "semantic-ui-react";
import RecentTransactions from "../../src/components/Dashboard/RecentTransactions";
import UpcomingTransactions from "../../src/components/Budget/UpcomingTransactions";

describe("Dashboard", () => {
    it("renders", () => {
        const wrapper = mount(<Dashboard user={testUser} onUpdate={jest.fn()} />, routerContext);
        expect(wrapper.find(ExpenseChart)).toHaveLength(1);
        expect(wrapper.find(Tab)).toHaveLength(1);
        expect(wrapper.find(RecentTransactions)).toHaveLength(1);
        expect(wrapper.find(UpcomingTransactions)).toHaveLength(1);
    });
});
