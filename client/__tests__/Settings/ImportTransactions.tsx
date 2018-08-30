import React from "react";
import { mount } from "enzyme";
import ImportTransactions from "../../src/components/Settings/ImportTransactions";
import { Input, Message } from "semantic-ui-react";

describe("ImportTransactions", () => {
    const wrapper = mount(<ImportTransactions onImportTransactions={() => new Promise<{}>((resolve, reject) => {})} />);

    it("renders", () => {
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("errorMessage")).toBe("");
        expect(wrapper.state("successMessage")).toBe("");
    });

    it("displays errors", () => {
        expect(wrapper.find(Message).prop("hidden")).toBe(true);
        wrapper.setState({errorMessage: "Invalid file type."});
        expect(wrapper.find(Message).prop("hidden")).toBe(false);
        expect(wrapper.find(Message).prop("error")).toBe(true);
    });

    it("displays success messages", () => {
        wrapper.setState({errorMessage: "", successMessage: "Imported transactions."});
        expect(wrapper.find(Message).prop("error")).toBe(false);
        expect(wrapper.find(Message).prop("success")).toBe(true);
    });
});
