import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
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

  onDeleteMyplace(myplaceId) {
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
            <ul>
              {this.props.myPlace.map(myplace => (
                <NavLink exact to={`/place/${myplace._id}`} key={myplace._id}>
                  <li>
                    <div className="myplace-image-wrapper">
                      <img src={myplace.place_picture} alt="place shot" />
                    </div>
                    <div className="myplace-content-wrapper">
                      <div className="myplace-info-box">
                        <div className="myplace-title">{myplace.title}</div>
                        <div className="myplace-location">
                          {myplace.address}
                        </div>
                        <div className="myplace-tag">{myplace.tag}</div>
                      </div>
                      <div className="delete-myplace">
                        <MdDelete
                          onClick={() => this.onDeleteMyplace(myplace._id)}
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
