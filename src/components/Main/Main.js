import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchPlace from "../SearchPlace/SearchPlace";
import { MdLocationOn, MdPerson } from "react-icons/md";
import "./Main.scss";

class Main extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="Main">
        {this.props.isSearched ? (
          <SearchPlace searchedPlace={this.props.searchedPlace} />
        ) : (
          <div className="place-list-container">
            <h2>최근 올라온 장소</h2>
            <ul>
              {this.props.place.map(place => (
                <NavLink
                  exact
                  to={`/place/${place._id}`}
                  key={place._id}
                  className="place-list-link"
                >
                  <li className="place-list">
                    <div className="place-image-wrapper">
                      <img src={place.place_picture[0]} alt="place shot" />
                    </div>
                    <div className="place-content-wrapper">
                      <div className="place-location">
                        <MdLocationOn className="MdLocationOn" />
                        {place.address}
                      </div>
                      <div className="place-title">{place.title}</div>
                      <div className="place-author">
                        <MdPerson className="MdPerson" />
                      {place.created_by}
                      </div>
                      <div className="place-tag">
                        <ul>
                          {place.tag.map((tag, index) => (
                            <li key={index}>
                              <span>#{tag}</span>
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
        )}
      </div>
    );
  }
}

export default Main;
