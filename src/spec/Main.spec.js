import React from "react";
import { shallow } from "enzyme";
import Main from "../components/Main/Main";

describe("<Main />", () => {
  let wrapper;
  const props = {
    onLoad: jest.fn(),
    place: [
      {
        _id: "5daf9244d360a257663569a5",
        place_picture: [
          "https://my-hidden-place.s3.ap-northeast-2.amazonaws.com/1571787331747.jpg"
        ],
        tag: ["서울", "런던", "파리"],
        title: "도시와 강",
        created_by: "test",
        created_at: "2019-10-22T23:35:32.226+00:00",
        description: "도시와 강",
        address: "서울",
        location: {
          coordinates: ["-0.08769340000003467", "51.5082192"]
        }
      }
    ],
    searchedPlace: [],
    isSearched: false,
    failSearchMsg: "검색 결과가 없습니다."
  };

  beforeEach(() => {
    wrapper = shallow(<Main {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("must have place property", function() {
    expect(wrapper.contains(<div className="place-title">도시와 강</div>)).toBe(true);
  });
});
