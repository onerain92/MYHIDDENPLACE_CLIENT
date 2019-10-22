import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../image/myhiddenplace.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ""
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.submitSearchInput = this.submitSearchInput.bind(this);
  }

  handleSearchInputChange = event => {
    this.setState({
      searchInput: event.target.value
    });
  };

  submitSearchInput = event => {
    event.preventDefault();
    const searchInput = this.state.searchInput;
    this.props.onSubmit(searchInput);

    this.setState({ searchInput: "" });
  };

  render() {
    return (
      <div className="Header">
        <div className="navigation">
          <NavLink exact to={"/main"} onClick={this.props.onClick}>
            <div className="logo-wrapper">
              <img src={logo} alt="myhiddenplace logo" />
            </div>
          </NavLink>
          <form onSubmit={this.submitSearchInput}>
            <div className="search-box">
              <input
                type="search"
                value={this.state.searchInput}
                placeholder="Search"
                onChange={this.handleSearchInputChange}
              />
              <input type="submit" />
            </div>
          </form>
          <NavLink exact to={"/Signup"}>
            <button
              className={
                this.props.isAuthenticated ? `remove-btn` : `signup-btn`
              }
            >
              회원가입
            </button>
          </NavLink>
          {this.props.isAuthenticated ? (
            <NavLink exact to={"/main"}>
              <button
                className="signin-out-btn"
                onClick={() => this.props.handleSignout()}
              >
                로그아웃
              </button>
            </NavLink>
          ) : (
            <NavLink exact to={"/Signin"}>
              <button className="signin-out-btn">로그인</button>
            </NavLink>
          )}
          <NavLink exact to={"/new"}>
            <button
              className={
                this.props.isAuthenticated ? "create-place-btn" : "remove-btn"
              }
            >
              장소 만들기
            </button>
          </NavLink>
          <NavLink exact to={"/mypage"}>
            <div
              className={this.props.isAuthenticated ? "mypage" : "remove-btn"}
            >
              <button className="mypage-btn">{this.props.user.username}</button>
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
