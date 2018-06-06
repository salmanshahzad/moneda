import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import SignInDialog from "../../src/components/Home/SignInDialog";
import { Modal } from "semantic-ui-react";

describe("SignInDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeEach(() => {
        wrapper = mount(<SignInDialog open={true} close={() => {}} />);
    });

    it("renders", () => {
        expect(wrapper.prop("open")).toBe(true);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
