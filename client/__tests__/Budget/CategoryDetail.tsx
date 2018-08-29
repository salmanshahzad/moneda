import React from "react";
import testUser from "../testUser";
import { mount } from "enzyme";
import CategoryDetail from "../../src/components/Budget/CategoryDetail";
import { Header } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import TransactionsThisMonth from "../../src/components/Budget/TransactionsThisMonth";
import ProgressBar from "../../src/components/Budget/ProgressBar";

describe("CategoryDetail", () => {
    const category = {
        category: testUser.income[0],
        transactions: [],
        upcomingTransactions: []
    };
    const wrapper = mount(<CategoryDetail categoryDetail={category} onUpdate={jest.fn()}  />);

    it("renders", () => {
        expect(wrapper.find(Header).at(0).text()).toBe("Test Income 1");
        expect(wrapper.find(Header).at(1).text()).toBe("$0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(0);
        expect(wrapper.find(Line)).toHaveLength(1);
        expect(wrapper.find(TransactionsThisMonth)).toHaveLength(1);
        wrapper.setProps({categoryDetail: {
            category: testUser.expenses[0],
            transactions: [],
            upcomingTransactions: []
        }});
        expect(wrapper.find(Header).at(0).text()).toBe("Test Expense 1");
        expect(wrapper.find(Header).at(1).text()).toBe("$0.00 of $0.00");
        expect(wrapper.find(ProgressBar)).toHaveLength(1);
    });
});
