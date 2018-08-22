import React from "react";
import { mount } from "enzyme";
import Feature from "../../src/components/Home/Feature";
import { Image, Icon, Header } from "semantic-ui-react";

describe("Feature", () => {
    it("renders", () => {
        const wrapper = mount(<Feature image="img" icon="calculator" content="Feature" />);
        expect(wrapper.find(Image).prop("src")).toBe("img");
        expect(wrapper.find(Icon).prop("name")).toBe("calculator");
        expect(wrapper.find(Header).text()).toBe("Feature");
    });
});
