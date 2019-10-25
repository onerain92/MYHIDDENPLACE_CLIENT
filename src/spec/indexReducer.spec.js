import signinUserReducer from "../reducers/index";
import isAuthenticatedReducer from "../reducers/index";
import getPlaceReducer from "../reducers/index";
import getSearchedPlaceReducer from "../reducers/index"

import {
  SIGNIN_USER,
  IS_AUTHENTICATED,
  IS_NOT_AUTHENTICATED,
  GET_PLACE,
  SEARCH_PLACE,
  INITIALIZE_SEARCHED_PLACE,
} from "../constants/actionTypes";

describe("reducer tests", () => {
  describe("signinUserReducer", () => {
    const initialState = {
      user: {
        favorite: []
      },
    };
    let state = signinUserReducer(initialState, {});

    it("should return the initialState", () => {
      expect(state.user).toEqual({
        favorite: []
      });
    });

    it("should return object", function() {
      state = signinUserReducer(initialState.user, {
        type: SIGNIN_USER,
        data: {
          id: "test@test.com",
          username: "test",
          favorite: ["123456789"]
        }
      });
      expect(typeof state.user).toBe("object");
    });

    it("should return the user information", () => {
      state = signinUserReducer(initialState.user, {
        type: SIGNIN_USER,
        data: {
          id: "test@test.com",
          username: "test",
          favorite: ["123456789"]
        }
      });
      expect(state.user).toHaveProperty("username");
      expect(Array.isArray(state.user.favorite)).toBe(true);
    });

    it("should return the empty object", () => {
      state = signinUserReducer(initialState.user, {
        type: IS_NOT_AUTHENTICATED,
        data: false
      });
      expect(Object.keys(state.user).length).toBe(0);
    });
  });

  describe("isAuthenticatedReducer", () => {
    const initialState = {
      isAuthenticated: false
    };
    let state = isAuthenticatedReducer(initialState, {});

    it("should return the initialState", () => {
      expect(state.isAuthenticated).toEqual(false);
    });

    it("should return true when a user login", () => {
      state = isAuthenticatedReducer(initialState, {
        type: IS_AUTHENTICATED,
        data: true
      });
      expect(state.isAuthenticated).toBe(true);
    });
    it("should return false when a user logout", () => {
      state = isAuthenticatedReducer(initialState, {
        type: IS_NOT_AUTHENTICATED,
        data: false
      });
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("getPlaceReducer", () => {
    const initialState = {
      place: []
    };
    let state = getPlaceReducer(initialState, {});

    it("should return the initialState", () => {
      expect(Array.isArray(state.place)).toEqual(true);
    });

    it("should return places", () => {
      state = isAuthenticatedReducer(initialState, {
        type: GET_PLACE,
        data: ["123456789"]
      });
      expect(state.place.length !== 0).toEqual(true);
    });
  });

  describe("getSearchedPlaceReducer", () => {
    const initialState = {
      searchedPlace: []
    };
    let state = getSearchedPlaceReducer(initialState, {});

    it("should return the initialState", () => {
      expect(Array.isArray(state.searchedPlace)).toEqual(true);
    });

    it("should return places", () => {
      state = getSearchedPlaceReducer(initialState, {
        type: SEARCH_PLACE,
        data: ["123456789"]
      });
      expect(state.searchedPlace.length !== 0).toEqual(true);
    });

    it("should be initialized", () => {
      state = getSearchedPlaceReducer(initialState, {
        type: INITIALIZE_SEARCHED_PLACE,
      });
      expect(state.searchedPlace.length === 0).toEqual(true);
    });

  });
});
