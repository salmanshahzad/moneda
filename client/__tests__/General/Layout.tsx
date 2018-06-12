import React from "react";
import { mount } from "enzyme";
import "../config";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../src/components/general/Layout";

describe("Layout", () => {
    it("renders", () => {
        // need MemoryRouter because NavBar contains Link which cannot be rendered outside a Router
        const wrapper = mount(<MemoryRouter><Layout /></MemoryRouter>);
        expect(wrapper.find("br")).toHaveLength(1);
        // cannot test anything else because Layout is not the root component so enzyme cannot set its state
    });
});
