const newUser = (registerUser) => {
  return fetch("http://localhost:8081/api/auth/signup", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name: registerUser.name,
      last_name: registerUser.last_name,
      nickname: registerUser.nickname,
      genero: registerUser.genero,
      fecha_nacimiento: registerUser.fecha_nacimiento,
      email: registerUser.email,
      confirm_email: registerUser.confirm_email,
      password: registerUser.password,
      confirm_password: registerUser.confirm_password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

//ACA MANDO LA COOKIE (ME QUEDA UNA SOLA EN LA DB), LA PONGO EN EL NAVEGADOR
const signUser = (loginUser) => {
  return fetch("http://localhost:8081/api/auth/signin", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email: loginUser.email,
      password: loginUser.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const getUserDatos = (nick) => {
  return fetch("http://localhost:8081/api/auth/" + nick, {
    credentials: "include",
  });
};

const getUserDatosGuards = () => {
  return fetch("http://localhost:8081/api/auth/datos-user", {
    credentials: "include",
  });
};

const logout = () => {
  return fetch("http://localhost:8081/api/auth/logout", {
    credentials: "include",
  });
};

const authenticated = () => {
  return fetch("http://localhost:8081/api/auth/authenticated", {
    credentials: "include",
  });
};

const postUserFavPost = (id) => {
  return fetch("http://localhost:8081/api/auth/post/updateFav", {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const deleteUserFavPost = (id) => {
  return fetch("http://localhost:8081/api/auth/post/deleteFav", {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const getUserFavPost = () => {
  return fetch("http://localhost:8081/api/auth/post/favs", {
    credentials: "include",
  });
};

module.exports = {
  newUser,
  signUser,
  logout,
  authenticated,
  getUserDatos,
  postUserFavPost,
  deleteUserFavPost,
  getUserFavPost,
  getUserDatosGuards,
};
