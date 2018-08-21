import React from "react";
import { mount } from "enzyme";
import ImportData from "../../src/components/Settings/ImportData";
import { Input, Message } from "semantic-ui-react";

describe("ImportData", () => {
    const wrapper = mount(<ImportData onImportData={() => new Promise<{}>((resolve, reject) => {})} />);

    it("renders", () => {
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("message")).toBe("");
    });

    it("displays errors", () => {
        expect(wrapper.find(Message).prop("hidden")).toBe(true);
        wrapper.setState({message: "Error"});
        expect(wrapper.find(Message).prop("hidden")).toBe(false);
        expect(wrapper.find(Message).prop("error")).toBe(true);
    });

    it("displays success messages", () => {
        wrapper.setState({message: "Success"});
        expect(wrapper.find(Message).prop("error")).toBe(false);
        expect(wrapper.find(Message).prop("success")).toBe(true);
    });
});
