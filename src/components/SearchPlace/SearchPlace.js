import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import "./SearchPlace.scss";

class SearchPlace extends Component {
  render() {
    return (
      <div className="SearchPlace">
        <div className="searchplace-list-container">
          <h2>검색한 장소</h2>
          <ul>
            {this.props.searchedPlace.map((searchplace, index) => (
              <NavLink
                exact
                to={`/place/${searchplace._id}`}
                key={index}
                className="searchplace-list-link"
              >
                <li className="searchplace-list">
                  <div className="searchplace-image-wrapper">
                    <img
                      src={searchplace.place_picture}
                      alt="searched place shot"
                    />
                  </div>
                  <div className="searchplace-content-wrapper">
                    <div className="searchplace-location">
                      <MdLocationOn />
                      {searchplace.address}
                    </div>
                    <div className="searchplace-title">{searchplace.title}</div>
                    <div className="searchplace-author">
                      {searchplace.created_by}
                    </div>
                    <div className="searchplace-tag">
                      <ul>
                        {searchplace.tag.map((item, index) => (
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

export default SearchPlace;
