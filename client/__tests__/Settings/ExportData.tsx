import React from "react";
import { mount } from "enzyme";
import ExportData from "../../src/components/Settings/ExportData";
import testUser from "../testUser";
import { Form } from "semantic-ui-react";

describe("ExportData", () => {
    const wrapper = mount(<ExportData user={testUser} />);

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
