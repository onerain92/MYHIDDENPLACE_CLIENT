import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Signup.scss";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: "",
        password: "",
        checkPassword: "",
        username: ""
      },
      errors: {
        email: "",
        password: "",
        checkPassword: "",
        username: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitUserSignupForm = this.submitUserSignupForm.bind(this);
  }

  handleInputChange = event => {
    const fields = this.state.fields;
    fields[event.target.name] = event.target.value;

    this.setState({
      fields
    });
  };

  submitUserSignupForm = event => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.onSubmit(this.state.fields);

      const fields = {};
      fields["email"] = "";
      fields["password"] = "";
      fields["checkPassword"] = "";
      fields["username"] = "";
      this.setState({ fields });
    }
  };

  validateForm = () => {
    const fields = this.state.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "* 이메일을 입력해주세요.";
    }

    if (typeof fields["email"] !== "undefined") {
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "* 정확한 이메일을 입력해주세요.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "* 비밀번호를 입력해주세요.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] =
          "* 영문 소문자 8자리 이상, 특수문자를 포함해야 합니다.";
      }
    }

    if (!fields["checkPassword"]) {
      formIsValid = false;
      errors["checkPassword"] = "* 다시 한 번 비밀번호를 작성해주세요.";
    }

    if (typeof fields["checkPassword"] !== "undefined") {
      if (!fields["checkPassword"].match(fields["password"])) {
        formIsValid = false;
        errors["checkPassword"] = "* 작성하신 비밀번호와 일치하지 않습니다.";
      }
    }

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "* 이름을 입력해주세요.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "* 영문 소문자 또는 대문자로 입력해주세요.";
      }
    }

    this.setState({
      errors
    });

    return formIsValid;
  };

  render() {
    return (
      <div className="Signup">
        <div className="signup-title">회원가입</div>
        <form onSubmit={this.submitUserSignupForm}>
          <div className="form-group email">
            <label>이메일</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.fields.email}
              placeholder="이메일을 입력해주세요."
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.email}</div>
          </div>
          <div className="form-group password">
            <label>비밀번호</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.fields.password}
              placeholder="비밀번호를 입력해주세요"
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.password}</div>
          </div>
          <div className="form-group password">
            <label>비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              name="checkPassword"
              value={this.state.fields.checkPassword}
              placeholder="다시 한 번 입력해주세요."
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.checkPassword}</div>
          </div>
          <div className="form-group username">
            <label>이름</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.fields.username}
              placeholder="이름을 입력해주세요."
              onChange={this.handleInputChange}
            />
            <div className="errorMsg">{this.state.errors.username}</div>
          </div>
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
        <div className="ask-account">이미 계정이 있으신가요?</div>
        <NavLink exact to={"/Signin"} className="move">
          <button className="signin">로그인</button>
        </NavLink>
      </div>
    );
  }
}

export default withRouter(Signup);
