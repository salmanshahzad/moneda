import React from "react";
import { mount } from "enzyme";
import ExportTransactions from "../../src/components/Settings/ExportTransactions";
import testUser from "../testUser";
import { Form } from "semantic-ui-react";

describe("ExportTransactions", () => {
    const wrapper = mount(<ExportTransactions user={testUser} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("includeUpcoming")).toBe(false);
    });

    it("changes the state when the includeUpcoming checkbox is checked", () => {
        wrapper.find("input[value='includeUpcoming']").simulate("change", {target: {checked: true}});
        expect(wrapper.state("includeUpcoming")).toBe(true);
    });
});
