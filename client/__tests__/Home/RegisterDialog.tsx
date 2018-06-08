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
        // cannot test nodes inside modal; see: https://github.com/Semantic-Org/Semantic-UI-React/issues/1518, https://github.com/airbnb/enzyme/issues/1596 (open issue as of jun 8)
    });
});
