import React from "react";
import { mount } from "enzyme";
import SignInDialogModal from "../../src/components/Home/SignInDialogModal";
import { Modal } from "semantic-ui-react";

describe("SignInDialogModal", () => {
    it("renders", () => {
        const emptyFunction = jest.fn();
        const wrapper = mount(<SignInDialogModal open={true} onClose={emptyFunction} onSignIn={emptyFunction} />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
