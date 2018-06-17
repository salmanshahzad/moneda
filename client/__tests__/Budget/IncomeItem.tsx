import React from "react";
import { mount } from "enzyme";
import routerContext from "../routerContext";
import { Link } from "react-router-dom";
import IncomeItem from "../../src/components/Budget/IncomeItem";

describe("IncomeItem", () => {
    const wrapper = mount(<IncomeItem name="Test" amount={1} percentage={50} />, routerContext);

    it("renders", () => {
        expect(wrapper.find(Link)).toHaveLength(1);
    });

    it("formats the information correctly", () => {
        expect(wrapper.find(Link).prop("to")).toBe("/income/Test");
        expect(wrapper.find(Link).text()).toBe("Test");
        expect(wrapper.find("span").text()).toBe("$1.00 (50.0%)");
    });
});
