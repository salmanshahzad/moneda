import React from "react";
import { mount } from "enzyme";
import ExportData from "../../src/components/Settings/ExportData";
import testUser from "../testUser";
import { Form } from "semantic-ui-react";

describe("Settings", () => {
    const wrapper = mount(<ExportData user={testUser} />);

    it("renders", () => {
        expect(wrapper.find(Form)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("data")).toBe("transactions");
        expect(wrapper.state("includeUpcoming")).toBe(false);
        expect(wrapper.state("format")).toBe("csv");
    });

    it("changes the state when inputs are changed", () => {
        wrapper.find("input[value='account']").simulate("change", {target: {checked: true}});
        expect(wrapper.state("data")).toBe("account");

        wrapper.setState({data: "transactions"});
        wrapper.find("input[value='includeUpcoming']").simulate("change", {target: {checked: true}});
        expect(wrapper.state("includeUpcoming")).toBe(true);

        wrapper.find("input[value='json']").simulate("change", {target: {checked: true}});
        expect(wrapper.state("format")).toBe("json");
    });

    it("disables the upcoming transactions checkbox when the account radio button is checked", () => {
        wrapper.setState({data: "account"});
        expect(wrapper.find("input[value='includeUpcoming']").prop("disabled")).toBe(true);
    });

    it("changes the format to json when the account radio button is checked", () => {
        wrapper.setState({data: "transactions", format: "csv"});
        wrapper.find("input[value='account']").simulate("change", {target: {checked: true}});
        expect(wrapper.state("format")).toBe("json");
        expect(wrapper.find("input[value='csv']").prop("disabled")).toBe(true);
    });
});
