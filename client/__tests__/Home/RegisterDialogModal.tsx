import React from "react";
import { mount } from "enzyme";
import "../config";
import RegisterDialogModal from "../../src/components/Home/RegisterDialogModal";
import { Modal } from "semantic-ui-react";

describe("RegisterDialogModal", () => {
    it("renders", () => {
        const emptyFunction = () => {};
        const wrapper = mount(<RegisterDialogModal open={true} onClose={emptyFunction} onRegister={emptyFunction} />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
