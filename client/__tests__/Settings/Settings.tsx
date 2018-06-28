import React from "react";
import { mount } from "enzyme";
import Settings from "../../src/components/Settings/Settings";
import testUser from "../testUser";
import UserInformation from "../../src/components/Settings/UserInformation";
import Account from "../../src/components/Settings/Account";

describe("Settings", () => {
    const wrapper = mount(<Settings user={testUser} onUpdate={() => {}} />);

    it("renders", () => {
        expect(wrapper.find(UserInformation)).toHaveLength(1);
        expect(wrapper.find(Account)).toHaveLength(3);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("addIncome")).toBe(false);
        expect(wrapper.state("addExpense")).toBe(false);
    });
});
