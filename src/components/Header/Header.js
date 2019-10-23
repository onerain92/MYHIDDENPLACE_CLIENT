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
                onChange={this.handleSearchInputChange}
                className="search-bar"
              />
              <input type="submit" className="search-button" value="검색" />
            </div>
          </form>

          <div className="button-group">
            <NavLink exact to={"/Signup"}>
              <button
                className={
                  this.props.isAuthenticated ? `remove-button` : `signup-btn`
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
                <button className="signin-in-btn">로그인</button>
              </NavLink>
            )}

            <NavLink exact to={"/new"}>
              <button
                className={
                  this.props.isAuthenticated
                    ? "create-place-btn"
                    : "remove-button"
                }
              >
                장소 추가
              </button>
            </NavLink>
            <NavLink exact to={"/mypage"}>
              <button
                className={
                  this.props.isAuthenticated ? "mypage-button" : "remove-button"
                }
              >
                마이페이지
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
