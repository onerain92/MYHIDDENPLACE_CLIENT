import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import "./MyFavorite.scss";

class MyFavorite extends Component {
  componentDidMount() {
    const userId = this.props.user.id;
    this.props.onLoad(userId);
  }

  render() {
    return (
      <div className="MyFavorite">
        <div className="myfavorite-list">
          <h2>내가 선택한 장소</h2>
          <ul>
            {this.props.myFavorite.map(myFavoritePlace => (
              <NavLink
                exact
                to={`/place/${myFavoritePlace._id}`}
                key={myFavoritePlace._id}
                className="myfavorite-place-list-link"
              >
                <li className="myfavorite-place-list">
                  <div className="myfavorite-place-image-wrapper">
                    <img src={myFavoritePlace.place_picture} alt="place shot" />
                  </div>
                  <div className="myfavorite-place-content-wrapper">
                    <div className="myfavorite-place-location">
                      <MdLocationOn />
                      {myFavoritePlace.address}
                    </div>
                    <div className="myfavorite-place-title">
                      {myFavoritePlace.title}
                    </div>
                    <div className="myfavorite-place-tag">
                      <ul>
                        {myFavoritePlace.tag.map((item, index) => (
                          <li key={index}>
                            <span>#{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MyFavorite;
