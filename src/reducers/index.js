import { combineReducers } from "redux";
import {
  SIGNUP_USER,
  SIGNIN_USER,
  SIGNUP_ERROR,
  SIGNIN_ERROR,
  IS_AUTHENTICATED,
  IS_NOT_AUTHENTICATED,
  UPLOAD_PLACE,
  UPLOAD_PLACE_ERROR,
  GET_PLACE,
  INITIALIZE_MSG,
  SEARCH_PLACE,
  IS_SEARCHED,
  INITIALIZE_SEARCHED_PLACE,
  PLACE_DETAILS,
  PLACE_DETAILS_ERROR,
  FAIL_SEARCH_PLACE
} from "../constants/actionTypes";

const initialState = {
  user: {},
  place: [],
  searchedPlace: [],
  placeDetails: {
    location: {
      coordinates: null
    }
  },
  isAuthenticated: false,
  isSearched: false,
  signinErrorMsg: null,
  failSearchMsg: null,
  signupSuccessMsg: null,
  signupErrorMsg: null,
  uploadPlaceMsg: null,
  uploadPlaceErrorMsg: null,
  placeDetailsErrorMsg: null
};

function signupUserReducer(state = initialState.signupSuccessMsg, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return action.data;
    default:
      return state;
  }
}

function signupErrorReducer(state = initialState.signupErrorMsg, action) {
  switch (action.type) {
    case SIGNUP_ERROR:
      return action.msg;
    default:
      return state;
  }
}

function signinUserReducer(state = initialState.user, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return action.data;
    case IS_NOT_AUTHENTICATED:
      return {};
    default:
      return state;
  }
}

function isAuthenticatedReducer(state = initialState.isAuthenticated, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return action.data;
    case IS_NOT_AUTHENTICATED:
      return action.data;
    default:
      return state;
  }
}

function signinErrorReducer(state = initialState.signinErrorMsg, action) {
  switch (action.type) {
    case SIGNIN_ERROR:
      return action.msg;
    default:
      return state;
  }
}

function uploadPlaceReducer(state = initialState.uploadPlaceMsg, action) {
  switch (action.type) {
    case UPLOAD_PLACE:
      return action.data;
    case INITIALIZE_MSG:
      return "";
    default:
      return state;
  }
}

function uploadPlaceErrorReducer(
  state = initialState.uploadPlaceErrorMsg,
  action
) {
  switch (action.type) {
    case UPLOAD_PLACE_ERROR:
      return action.data;
    default:
      return state;
  }
}

function getPlaceReducer(state = initialState.place, action) {
  switch (action.type) {
    case GET_PLACE:
      return [...action.data];
    default:
      return state;
  }
}

function getSearchedPlaceReducer(state = initialState.searchedPlace, action) {
  switch (action.type) {
    case SEARCH_PLACE:
      return [...action.data];
    case INITIALIZE_SEARCHED_PLACE:
      return [];
    default:
      return state;
  }
}

function isSearchedReducer(state = initialState.isSearched, action) {
  switch (action.type) {
    case IS_SEARCHED:
      return action.data;
    case INITIALIZE_SEARCHED_PLACE:
      return false;
    default:
      return state;
  }
}

function failSearchMsgReducer(state = initialState.failSearchMsg, action) {
  switch (action.type) {
    case FAIL_SEARCH_PLACE:
      return action.data;
    default:
      return state;
  }
}

function placeDetailsReducer(state = initialState.placeDetails, action) {
  switch (action.type) {
    case PLACE_DETAILS:
      return action.data;
    default:
      return state;
  }
}

function placeDetailsErrorMsgReducer(state = initialState.placeDetailsErrorMsg, action) {
  switch (action.type) {
    case PLACE_DETAILS_ERROR:
      return action.data;
    default:
      return state;
  }
}

const myhiddenplace = combineReducers({
  user: signinUserReducer,
  isAuthenticated: isAuthenticatedReducer,
  signinErrorMsg: signinErrorReducer,
  signupSuccessMsg: signupUserReducer,
  signupErrorMsg: signupErrorReducer,
  uploadPlaceMsg: uploadPlaceReducer,
  uploadPlaceErrorMsg: uploadPlaceErrorReducer,
  place: getPlaceReducer,
  searchedPlace: getSearchedPlaceReducer,
  isSearched: isSearchedReducer,
  failSearchMsg: failSearchMsgReducer,
  placeDetails: placeDetailsReducer,
  placeDetailsErrorMsg: placeDetailsErrorMsgReducer,
});

export default myhiddenplace;
