import React from "react";
import { mount } from "enzyme";
import "../config";
import SignInDialogModal from "../../src/components/Home/SignInDialogModal";
import { Modal } from "semantic-ui-react";

describe("SignInDialogModal", () => {
    it("renders", () => {
        const wrapper = mount(<SignInDialogModal open={true} onClose={() => {}} />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
