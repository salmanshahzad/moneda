import React from "react";
import { mount } from "enzyme";
import Transactions from "../../src/components/Transactions/Transactions";
import testUser from "../testUser";
import { Grid, Table } from "semantic-ui-react";

describe("Transactions", () => {
    const wrapper = mount(<Transactions user={testUser} onUpdate={() => {}} />);

    it("renders", () => {
        expect(wrapper.find(Grid)).toHaveLength(1);
        expect(wrapper.find(Table.Row)).toHaveLength(1 + testUser.transactions.length);
    });
});
