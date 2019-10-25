import { connect } from "react-redux";
import { withScriptjs } from "react-google-maps";
import App from "../components/App/App";
import {
  signUp,
  signIn,
  signupError,
  signinError,
  isAuthenticated,
  isNotAuthenticated,
  uploadPlace,
  uploadPlaceError,
  savePlace,
  initializeMsg,
  saveSearchPlace,
  failSearchPlace,
  isSearched,
  initializeSearchedPlace,
  placeDetails,
  placeDetailsError,
  saveComments,
  commentErrorMsg,
  saveScore,
  updateFavoriteList,
  saveMyPlace,
  myplaceSuccessMsg,
  saveMyFavorite
} from "../actions";
import {
  confirmUser,
  signupUser,
  signinUser,
  signoutUser,
  uploadImage,
  createPlaceInfo,
  getPlaceAll,
  searchPlace,
  getPlaceDetails,
  uploadComment,
  getComment,
  uploadFavoritePlace,
  removeFavoritePlace,
  getMyPlace,
  removeMyPlace,
  getMyFavoritePlace
} from "../api";

const mapStateToProps = state => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    signinErrorMsg: state.signinErrorMsg,
    signupSuccessMsg: state.signupSuccessMsg,
    signupErrorMsg: state.signupErrorMsg,
    uploadPlaceMsg: state.uploadPlaceMsg,
    uploadPlaceErrorMsg: state.uploadPlaceErrorMsg,
    place: state.place,
    searchedPlace: state.searchedPlace,
    isSearched: state.isSearched,
    failSearchMsg: state.failSearchMsg,
    placeDetails: state.placeDetails,
    placeDetailsErrorMsg: state.placeDetailsErrorMsg,
    comments: state.comments,
    commentErrorMsg: state.commentErrorMsg,
    avgScore: state.avgScore,
    myPlace: state.myPlace,
    removeMyPlaceMsg: state.removeMyPlaceMsg,
    myFavorite: state.myFavorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    moveToMain() {
      dispatch(initializeSearchedPlace());
    },
    validateUser() {
      confirmUser().then(data => {
        if (data.isAuthenticated) {
          dispatch(signIn(data.user));
          dispatch(isAuthenticated(data.isAuthenticated));
        } else {
          dispatch(signinError(data));
        }
      });
    },
    getPlace() {
      getPlaceAll().then(data => {
        dispatch(savePlace(data));
        dispatch(initializeMsg());
        dispatch(initializeSearchedPlace());
      });
    },
    registerUser(user) {
      signupUser(user).then(data => {
        if (data.successMessage) {
          dispatch(signUp(data.successMessage));
        } else {
          dispatch(signupError(data.errorMessage));
        }
      });
    },
    loginUser(user) {
      signinUser(user).then(data => {
        if (data.isAuthenticated) {
          dispatch(signIn(data.user));
          dispatch(isAuthenticated(data.isAuthenticated));
          dispatch(initializeMsg());
        } else {
          dispatch(signinError(data.signinErrorMessage));
        }
      });
    },
    logoutUser() {
      signoutUser().then(data => {
        dispatch(isNotAuthenticated(data.isAuthenticated));
      });
    },
    uploadPlace(imagefile, tags, placeInfo) {
      uploadImage(imagefile).then(data => {
        if (data.location) {
          placeInfo.imgfile = data.location;
          createPlaceInfo(tags, placeInfo).then(data => {
            dispatch(uploadPlace(data.successMessage));
          });
        } else {
          dispatch(uploadPlaceError(data.errorMessage));
        }
      });
    },
    getFoundPlace(searchInput) {
      searchPlace(searchInput).then(data => {
        if (data.isSearched) {
          dispatch(isSearched(data.isSearched));
          dispatch(saveSearchPlace(data.searchedPlaceInfo));
        } else {
          dispatch(failSearchPlace(data.searchFailMessage));
        }
      });
    },
    getSelectedPlace(placeId) {
      getPlaceDetails(placeId).then(data => {
        if (data.placeDetails) {
          dispatch(placeDetails(data.placeDetails));
        } else {
          dispatch(placeDetailsError(data.placeDetailsErrorMessage));
        }
      });
    },
    registerComment(placeId, text, score) {
      uploadComment(placeId, text, score).then(data => {
        console.log(data.successCommentMessage);
      });
    },
    loadComment(placeId) {
      getComment(placeId).then(data => {
        if (data.comments) {
          dispatch(saveComments(data.comments));
          dispatch(saveScore(data.avgScore));
        } else {
          dispatch(commentErrorMsg(data.commentErrorMessage));
        }
      });
    },
    registerFavoritePlace(placeId) {
      uploadFavoritePlace(placeId).then(data => {
        dispatch(updateFavoriteList(data.favorite));
      });
    },
    deleteFavoritePlace(placeId) {
      removeFavoritePlace(placeId).then(data => {
        dispatch(updateFavoriteList(data.favorite));
      });
    },
    loadMyPlace(userId) {
      getMyPlace(userId).then(data => {
        dispatch(saveMyPlace(data));
      });
    },
    deleteMyPlace(myPlaceId) {
      removeMyPlace(myPlaceId).then(data => {
        dispatch(myplaceSuccessMsg(data.deleteMyPlaceSuccessMessage));
      });
    },
    loadMyFavoritePlace(userId) {
      getMyFavoritePlace(userId).then(data => {
        dispatch(saveMyFavorite(data));
      });
    }
  };
};

export default withScriptjs(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
