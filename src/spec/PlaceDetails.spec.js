import React from "react";
import { shallow } from "enzyme";
import PlaceDetails from "../components/CreatePlace/CreatePlace";

describe("<PlaceDetails />", () => {
  let wrapper;
  const props = {
    onLoad: jest.fn(),
    placeDetails: [
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
    isMarkerShown: true,
    onSubmit: jest.fn(),
    isAuthenticated: true,
    onLoadComment: jest.fn(),
    comment: [],
    commentErrorMsg: "댓글이 없습니다.",
    avgScore: 0,
    registerFavoritePlace: jest.fn(),
    favoritePlace: jest.fn(),
    deleteFavoritePlace: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<PlaceDetails {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip("must have title", function() {
    expect(
      wrapper.contains(<h1 className="place-details-title">도시와 강</h1>)
    ).toBe(true);
  });
});
