import React from "react";
import { mount } from "enzyme";
import ProgressBar from "../../src/components/General/ProgressBar";
import { Progress } from "semantic-ui-react";

describe("ProgressBar", () => {
    const wrapper = mount(<ProgressBar value={0} total={0} />);

    it("renders", () => {
        expect(wrapper.find(Progress)).toHaveLength(1);
    });

    it("shows the correct colour", () => {
        expect(wrapper.find(Progress).prop("color")).toBe("green");
        wrapper.setProps({value: 1});
        expect(wrapper.find(Progress).prop("color")).toBe("red");
        wrapper.setProps({value: 0, total: 1});
        expect(wrapper.find(Progress).prop("color")).toBe("green");
        wrapper.setProps({value: 0.75, total: 1});
        expect(wrapper.find(Progress).prop("color")).toBe("yellow");
        wrapper.setProps({value: 2, total: 1});
        expect(wrapper.find(Progress).prop("color")).toBe("red");
    });
});
