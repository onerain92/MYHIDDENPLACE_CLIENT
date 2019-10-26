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

  it("must have submit button", () => {
    expect(
      wrapper.contains(
        <button type="submit" className="submit-place-button">
          제출
        </button>
      )
    ).toBe(true);
  });

  it("simulate onChange event", () => {
    const fileContents = "file contents";
    const file = new Blob([fileContents], { type: "img/png'" });
    const readAsDataURL = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => {
      evtHandler();
    });
    const dummyFileReader = {
      addEventListener,
      readAsDataURL,
      result: fileContents
    };
    window.FileReader = jest.fn(() => dummyFileReader);
    wrapper.find("#select-file").simulate("change", {
      preventDefault: jest.fn(),
      target: { files: [file] },
      readAsDataURL: jest.fn(file)
    });
    expect(FileReader).toHaveBeenCalled();
  });

  it("Should setState value correctly onChange", () => {
    const input = wrapper.find(".place-title");
    input.simulate("change", {target: { value: ""}});
    expect(wrapper.state().placeInfoGroup.title).toEqual("");
  });
});
