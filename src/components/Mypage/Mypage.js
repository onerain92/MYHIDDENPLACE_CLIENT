import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete, MdLocationOn } from "react-icons/md";
import MyFavorite from "../MyFavorite/MyFavorite";
import "./Mypage.scss";

class Mypage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };

    this.onDeleteMyplace = this.onDeleteMyplace.bind(this);
    this.onToggleMyPage = this.onToggleMyPage.bind(this);
  }
  componentDidMount() {
    const userId = this.props.user.id;
    this.props.onLoad(userId);
  }

  onDeleteMyplace(event, myplaceId) {
    event.preventDefault();
    this.props.deleteMyPlace(myplaceId);
  }

  onToggleMyPage = event => {
    event.preventDefault();

    if (event.target.name === "myplace") {
      this.setState({
        isClicked: false
      });
    } else {
      this.setState({
        isClicked: true
      });
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="Mypage">
        <div className="Mypage-header">
          <input
            type="button"
            name="myplace"
            value="내 장소"
            onClick={event => this.onToggleMyPage(event)}
          />
          <input
            type="button"
            name="favorite"
            value="즐겨찾기"
            onClick={event => this.onToggleMyPage(event)}
          />
        </div>

        {this.state.isClicked ? (
          <MyFavorite
            user={this.props.user}
            myFavorite={this.props.myFavorite}
            onLoad={this.props.loadMyFavoritePlace}
          />
        ) : (
          <div className="myplace-list">
            <h2>내가 올린 장소</h2>
            <ul>
              {this.props.myPlace.map(myplace => (
                <NavLink
                  exact
                  to={`/place/${myplace._id}`}
                  key={myplace._id}
                  className="myplace-list-link"
                >
                  <li className="myplace-list">
                    <div className="myplace-image-wrapper">
                      <img src={myplace.place_picture} alt="place shot" />
                    </div>
                    <div className="myplace-content-wrapper">
                      <div className="myplace-info-box">
                        <div className="myplace-location">
                          <MdLocationOn />
                          {myplace.address}
                        </div>
                        <div className="myplace-title">{myplace.title}</div>

                        <div className="myplace-tag">
                          <ul>
                            {myplace.tag.map((item, index) => (
                              <li key={index}>
                                <span>#{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="delete-myplace">
                        <MdDelete
                          onClick={event =>
                            this.onDeleteMyplace(event, myplace._id)
                          }
                        />
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

export default Mypage;
