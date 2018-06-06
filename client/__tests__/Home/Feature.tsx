import React from "react";
import { mount } from "enzyme";
import "../config";
import Feature from "../../src/components/Home/Feature";
import { Item } from "semantic-ui-react";

describe("Feature", () => {
    it("renders", () => {
        const wrapper = mount(<Feature title="Feature" body="Description" />);
        expect(wrapper.find(Item.Header).text()).toBe("Feature");
        expect(wrapper.find(Item.Description).text()).toBe("Description");
    });
});
