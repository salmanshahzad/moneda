import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import Layout from "../../src/components/General/Layout";

describe("Layout", () => {
    const wrapper = mount(<Layout />, routerContext);

    it("renders", () => {
        expect(wrapper.find("br")).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("sidebarOpen")).toBe(false);
        // auth should be loading at start but becomes no since componentDidMount calls the server
        // expect(wrapper.state("auth")).toBe("loading");
        expect(wrapper.state("user")).toBe(null);
    });
});
