import React from "react";
import { ReactWrapper, mount } from "enzyme";
import "../config";
import RegisterDialog from "../../src/components/Home/RegisterDialog";
import { Modal } from "semantic-ui-react";

describe("RegisterDialog", () => {
    let wrapper: ReactWrapper<any, any>;

    beforeEach(() => {
        wrapper = mount(<RegisterDialog open={true} close={() => {}} />);
    });

    it("renders", () => {
        expect(wrapper.prop("open")).toBe(true);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
