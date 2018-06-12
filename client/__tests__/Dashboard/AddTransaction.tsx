import React from "react";
import { mount } from "enzyme";
import "../config";
import AddTransaction from "../../src/components/Dashboard/AddTransaction";
import { Tab } from "semantic-ui-react";

describe("AddTransaction", () => {
    it("renders", () => {
        const emptyPromise = jest.fn(() => new Promise<{}>((resolve, reject) => {}));
        const wrapper = mount(<AddTransaction incomeNames={[]} onAddIncomeTransaction={emptyPromise} expenseNames={[]} onAddExpenseTransaction={emptyPromise} />);
        expect(wrapper.find(Tab)).toHaveLength(1);
    });
});
