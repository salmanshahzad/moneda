import React from "react";
import { mount } from "enzyme";
import "../config";
import RegisterDialogModal from "../../src/components/Home/RegisterDialogModal";
import { Modal } from "semantic-ui-react";

describe("RegisterDialog", () => {
    it("renders", () => {
        const wrapper = mount(<RegisterDialogModal open={true} onClose={() => {}} />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });
});
