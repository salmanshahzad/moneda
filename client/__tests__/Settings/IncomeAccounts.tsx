import React from "react";
import { mount } from "enzyme";
import IncomeAccounts from "../../src/components/Settings/IncomeAccounts";
import IncomeAccountItem from "../../src/components/Settings/IncomeAccountItem";
import testUser from "../testUser";

describe("IncomeAccounts", () => {
    const wrapper = mount(<IncomeAccounts accounts={testUser.income} onUpdateIncomeAccount={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);

    it("renders", () => {
        expect(wrapper.find(IncomeAccountItem)).toHaveLength(1);
    });
});
