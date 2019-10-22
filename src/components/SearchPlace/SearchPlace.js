import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./SearchPlace.scss";

class SearchPlace extends Component {
  render() {
    return (
      <div className="SearchPlace">
        <div className="place-list-container">
          <ul>
            {this.props.searchedPlace.map((place, index) => (
              <NavLink
                exact
                to={`/place/${place._id}`}
                key={index}
                className="place-list-link"
              >
                <li className="place-list">
                  <div className="place-image-wrapper">
                    <img src={place.place_picture} alt="searched place shot" />
                  </div>
                  <div className="place-content-wrapper">
                    <div className="place-location">{place.address}</div>
                    <div className="place-title">{place.title}</div>
                    <div className="place-author">{place.created_by}</div>
                    <div className="place-tag">{place.tag}</div>
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

export default SearchPlace;
