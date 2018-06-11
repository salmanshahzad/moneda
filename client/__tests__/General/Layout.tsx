import React from "react";
import { mount } from "enzyme";
import "../config";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../src/components/general/Layout";
import NavBar from "../../src/components/general/NavBar";
import Dashboard from "../../src/components/Dashboard/Dashboard";

describe("Layout", () => {
    // need MemoryRouter because NavBar contains Link which cannot be rendered outside a Router
    const wrapper = mount(<MemoryRouter initialEntries={["/dashboard"]}><Layout location={{pathname: ""}} /></MemoryRouter>);

    it("renders", () => {
        expect(wrapper.find(NavBar)).toHaveLength(1);
    });

    it("renders the correct component based on the route", () => {
        expect(wrapper.find(Dashboard)).toHaveLength(1);
    })
});
