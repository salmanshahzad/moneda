import React from "react";
import { mount } from "enzyme";
import DeleteUser from "../../src/components/Settings/DeleteUser";
import { Button } from "semantic-ui-react";

describe("DeleteUser", () => {
    const wrapper = mount(<DeleteUser onDeleteUser={jest.fn(() => new Promise<{}>((resolve, reject) => {}))} />);

    it("renders", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("has the correct initial state", () => {
        expect(wrapper.state("dialogOpen")).toBe(false);
    });

    it("opens the delete dialog when the delete button is clicked", () => {
        wrapper.find(Button).simulate("click");
        expect(wrapper.state("dialogOpen")).toBe(true);
    });
});
