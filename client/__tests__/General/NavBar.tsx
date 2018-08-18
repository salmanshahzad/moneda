import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import NavBar from "../../src/components/General/NavBar";
import { Menu } from "semantic-ui-react";

describe("NavBar", () => {
    it("renders", () => {
        const emptyFunction = jest.fn();
        const wrapper = mount(<NavBar sidebarOpen={false} onOpenSidebar={emptyFunction} onCloseSidebar={emptyFunction} />, routerContext);
        expect(wrapper.find(Menu)).toHaveLength(1);
    });
});
