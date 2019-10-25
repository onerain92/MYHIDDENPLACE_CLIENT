import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "http://localhost:4000"
});

export const confirmUser = () => {
  return api
    .get("/user")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const signupUser = newUser => {
  return api
    .post("/auth/signup", {
      ...newUser
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const signinUser = data => {
  return api
    .post("/auth/signin", {
      ...data
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const signoutUser = () => {
  return api.post("/auth/signout").then(res => {
    return res.data;
  });
};

export const uploadImage = imgfile => {
  return api
    .post("/image/upload", imgfile)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const getPlaceAll = () => {
  return api
    .get("/place")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err.response.data);
    });
};

export const uploadPlaceInfo = (tags, placeInfo) => {
  return api
    .post("/place/upload", { tags, placeInfo })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const searchPlace = searchInput => {
  return api
    .get("/place/search", { params: { word: searchInput } })
    .then(res => {
      console.log("api에서 서치드 플레이스 확인: ", res.data);
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const getPlaceDetails = placeId => {
  return api
    .get(`place/${placeId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const getComment = placeId => {
  return api
    .get(`/comment/${placeId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const uploadComment = (placeId, text, score) => {
  return api.post("/comment", { placeId, text, score }).then(res => {
    return res.data;
  });
};

export const uploadFavoritePlace = placeId => {
  return api.put(`/user/${placeId}`).then(res => {
    return res.data.favoriteList;
  });
};

export const removeFavoritePlace = placeId => {
  return api.put(`/user/remove/${placeId}`).then(res => {
    return res.data.favoriteList;
  });
};

export const getMyPlace = userId => {
  return api.get(`/place/myplace/${userId}`).then(res => {
    return res.data;
  });
};

export const removeMyPlace = myPlacdId => {
  return api.delete(`/place/myplace/${myPlacdId}`).then(res => {
    return res.data;
  });
};

export const getMyFavoritePlace = userId => {
  return api.get(`/place/favorite/${userId}`).then(res => {
    return res.data;
  });
};
