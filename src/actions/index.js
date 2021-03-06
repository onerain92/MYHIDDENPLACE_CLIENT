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
  FAIL_SEARCH_PLACE,
  INITIALIZE_SEARCHED_PLACE,
  PLACE_DETAILS,
  PLACE_DETAILS_ERROR,
  GET_COMMENTS,
  GET_COMMENTS_ERROR,
  SAVE_AVG_SCORE,
  UPDATE_FAVORITE,
  GET_MY_PLACE,
  REMOVE_MY_PLACE,
  GET_MY_FAVORITE
} from "../constants/actionTypes";

export const signUp = data => ({
  type: SIGNUP_USER,
  data
});

export const signIn = data => ({
  type: SIGNIN_USER,
  data
});

export const signupError = msg => ({
  type: SIGNUP_ERROR,
  msg
});

export const signinError = msg => ({
  type: SIGNIN_ERROR,
  msg
});

export const isAuthenticated = data => ({
  type: IS_AUTHENTICATED,
  data
});

export const isNotAuthenticated = data => ({
  type: IS_NOT_AUTHENTICATED,
  data
});

export const uploadPlace = data => ({
  type: UPLOAD_PLACE,
  data
});

export const uploadPlaceError = data => ({
  type: UPLOAD_PLACE_ERROR,
  data
});

export const savePlace = data => ({
  type: GET_PLACE,
  data
});

export const initializeMsg = () => ({
  type: INITIALIZE_MSG
});

export const saveSearchPlace = data => ({
  type: SEARCH_PLACE,
  data
});

export const failSearchPlace = data => ({
  type: FAIL_SEARCH_PLACE,
  data
})

export const isSearched = data => ({
  type: IS_SEARCHED,
  data
});

export const initializeSearchedPlace = () => ({
  type: INITIALIZE_SEARCHED_PLACE
});

export const placeDetails = data => ({
  type: PLACE_DETAILS,
  data
});

export const placeDetailsError = data => ({
  type: PLACE_DETAILS_ERROR,
  data
});

export const saveComments = data => ({
  type: GET_COMMENTS,
  data
});

export const commentErrorMsg = data => ({
  type: GET_COMMENTS_ERROR,
  data
});

export const saveScore = data => ({
  type: SAVE_AVG_SCORE,
  data
});

export const updateFavoriteList = data => ({
  type: UPDATE_FAVORITE,
  data
});

export const saveMyPlace = data => ({
  type: GET_MY_PLACE,
  data
});

export const myplaceSuccessMsg = data => ({
  type: REMOVE_MY_PLACE,
  data
});

export const saveMyFavorite = data => ({
  type: GET_MY_FAVORITE,
  data
})
