import React from "react";
import { shallow } from "enzyme";
import CreatePlace from "../components/CreatePlace/CreatePlace";

describe("<CreatePlace />", () => {
  let wrapper;
  const props = {
    onSubmit: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<CreatePlace {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("must have place property", function() {
    expect(
      wrapper.contains(
        <button type="submit" className="submit-place-button">
          제출
        </button>
      )
    ).toBe(true);
  });
});
