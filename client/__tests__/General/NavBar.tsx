import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import NavBar from "../../src/components/general/NavBar";
import { Menu } from "semantic-ui-react";

describe("NavBar", () => {
    it("renders", () => {
        const wrapper = mount(<NavBar sidebarOpen={false} onOpenSidebar={jest.fn()} />, routerContext);
        expect(wrapper.find(Menu)).toHaveLength(1);
    });
});
