import React from "react";
import { mount } from "enzyme";
import ConfirmButton from "../../src/components/General/ConfirmButton";
import { Button, Modal } from "semantic-ui-react";

describe("ConfirmButton", () => {
    const wrapper = mount(<ConfirmButton text="" header="" content="" />);

    it("renders", () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("dialogOpen")).toBe(false);
    });

    it("opens the dialog when the trigger is clicked", () => {
        wrapper.find(Button).simulate("click");
        expect(wrapper.state("dialogOpen")).toBe(true);
    });
});
