import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Mypage.scss";

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="place-list">
          <h1>마이 페이지~</h1>
          <div>내가 올린 장소</div>
          <div>내가 즐겨찾기한 장소</div>
        </div>
      </div>
    );
  }
}

export default Main;
