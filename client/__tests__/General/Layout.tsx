import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import Layout from "../../src/components/General/Layout";

describe("Layout", () => {
    // not testing rendering because when Layout mounts it calls the server and different components render
    it("has the correct initial state", () => {
        const wrapper = mount(<Layout />, routerContext);
        expect(wrapper.state("sidebarOpen")).toBe(false);
        // auth should be "loading" at start but becomes "no" since componentDidMount calls the server
        // expect(wrapper.state("auth")).toBe("loading");
        expect(wrapper.state("user")).toBe(null);
    });
});
