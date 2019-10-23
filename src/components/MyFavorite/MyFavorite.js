import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
          <ul>
            {this.props.myFavorite.map(myFavoritePlace => (
              <NavLink
                exact
                to={`/place/${myFavoritePlace._id}`}
                key={myFavoritePlace._id}
              >
                <li>
                  <div className="myfavorite-place-image-wrapper">
                    <img src={myFavoritePlace.place_picture} alt="place shot" />
                  </div>
                  <div className="myfavorite-place-content-wrapper">
                    <div className="myfavorite-place-info-box">
                      <div className="myfavorite-place-title">
                        {myFavoritePlace.title}
                      </div>
                      <div className="myfavorite-place-location">
                        {myFavoritePlace.address}
                      </div>
                      <div className="myfavorite-place-tag">
                        {myFavoritePlace.tag}
                      </div>
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
