import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Signin.scss";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        email: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitUserSigninForm = this.submitUserSigninForm.bind(this);
  }

  handleInputChange = event => {
    const fields = this.state.fields;
    fields[event.target.name] = event.target.value;

    this.setState({
      fields
    });
  };

  submitUserSigninForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.fields);

    const fields = {};
    fields["email"] = "";
    fields["password"] = "";
    this.setState({ fields });
  };

  render() {
    return (
      <div className="Signin">
        <div className="signin-title">로그인해주세요.</div>
        <form
        onSubmit={this.submitUserSigninForm}
        >
          <div className="form-group email">
            <label>이메일</label>
            <input
              type="email"
              className="input-email"
              name="email"
              value={this.state.fields.email}
              placeholder="E-mail"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group password">
            <label>비밀번호</label>
            <input
              type="password"
              className="input-password"
              name="password"
              value={this.state.fields.password}
              placeholder="Password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="errorMsg">{this.props.signinErrorMsg}</div>
          <button type="submit" className="signin-button">
            로그인
          </button>
        </form>

        <div className="ask-account">계정이 없으신가요?</div>
        <NavLink exact to={"/Signup"} className="move">
          <button className="signup">회원가입</button>
        </NavLink>
      </div>
    );
  }
}

export default Signin;
