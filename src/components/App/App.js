import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import CreatePlace from "../CreatePlace/CreatePlace";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Mypage from "../Mypage/Mypage";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.validateUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Header
          handleSignout={this.props.logoutUser}
          onSubmit={this.props.getFoundPlace}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          onClick={this.props.moveToMain}
        />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="main" />} />
          <Route
            exact
            path="/main"
            render={() => (
              <Main
                onLoad={this.props.getPlace}
                place={this.props.place}
                searchedPlace={this.props.searchedPlace}
                isSearched={this.props.isSearched}
                failSearchMsg={this.props.failSearchMsg}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => {
              if (this.props.signupSuccessMsg) {
                return <Redirect to="signin" />;
              } else {
                return <Signup onSubmit={this.props.registerUser} />;
              }
            }}
          />
          <Route
            path="/signin"
            render={() => {
              if (this.props.isAuthenticated) {
                return <Redirect to="main" />;
              } else {
                return (
                  <Signin
                    onSubmit={this.props.loginUser}
                    signinErrorMsg={this.props.signinErrorMsg}
                  />
                );
              }
            }}
          />
          <Route
            path="/new"
            render={() => {
              if (this.props.uploadPlaceMsg) {
                return <Redirect to="main" />;
              } else {
                return (
                  <CreatePlace
                    onSubmit={this.props.uploadPlace}
                    tag={this.props.tag}
                  />
                );
              }
            }}
          />
          } />
          <Route
            path={"/place/:place_id"}
            render={routeProps => (
              <PlaceDetails
                {...routeProps}
                onLoad={this.props.getSelectedPlace}
                placeDetails={this.props.placeDetails}
                isMarkerShown={true}
                onSubmit={this.props.registerComment}
                isAuthenticated={this.props.isAuthenticated}
                onLoadComment={this.props.loadComment}
                comments={this.props.comments}
                commentErrorMsg={this.props.commentErrorMsg}
                avgScore={this.props.avgScore}
                registerFavoritePlace={this.props.registerFavoritePlace}
              />
            )}
          />
          <Route path="/mypage" render={() => <Mypage />} />
        </Switch>
      </div>
    );
  }
}

export default App;
