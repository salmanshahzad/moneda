import React from "react";
import testUser from "../testUser";
import { mount } from "enzyme";
import AccountDetail from "../../src/components/Budget/AccountDetail";
import { Header } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import TransactionsThisMonth from "../../src/components/Budget/TransactionsThisMonth";
import ProgressBar from "../../src/components/Budget/ProgressBar";

describe("AccountDetail", () => {
    const account = {
        account: testUser.income[0],
        transactions: []
    };
    const wrapper = mount(<AccountDetail account={account}  />);

    it("renders", () => {
        expect(wrapper.find(Header).at(0).text()).toBe("Test Income 1");
        expect(wrapper.find(Header).at(1).text()).toBe("$0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(0);
        expect(wrapper.find(Line)).toHaveLength(1);
        expect(wrapper.find(TransactionsThisMonth)).toHaveLength(1);
        wrapper.setProps({account: {
            account: testUser.expenses[0],
            transactions: []
        }});
        expect(wrapper.find(Header).at(0).text()).toBe("Test Expense 1");
        expect(wrapper.find(Header).at(1).text()).toBe("$0.00 of $0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });
});
