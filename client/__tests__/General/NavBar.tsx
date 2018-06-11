import React from "react";
import { mount } from "enzyme";
import "../config";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../src/components/general/NavBar";
import { Menu } from "semantic-ui-react";

describe("NavBar", () => {
    it("renders", () => {
        // need MemoryRouter because NavBar contains Link which cannot be rendered outside a Router
        const wrapper = mount(<MemoryRouter><NavBar activePage="" sidebarOpen={false} onOpenSidebar={jest.fn()} /></MemoryRouter>);
        expect(wrapper.find(Menu)).toHaveLength(1);
    });
});
