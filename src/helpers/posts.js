//USER POSTS
const getUserPosts = () => {
  return fetch("http://localhost:8081/api/user/posts", {
    credentials: "include",
  });
};

//aca pongo las fetch donde consumo los endpoints de mi api
// si no pongo los parentesis res.json() no funciona
//ACA RECIBO LA COOKIE, SI NO TENGO ESTO LA CREO EN LA DB PERO NO LA PONGO EN EL NAVEGADRO, SE CREAN MUCHAS EN LA DB
const getPosts = () => {
  return fetch("http://localhost:8081/api/posts", {
    credentials: "include",
  });
  //al usar async/await no uso el then/catch, retorno una promesa (fetch siempre devuelve un promesa)
  //.then((res) => res.json())
  //.then((json) => console.log(json));
};

//revisar el tema del status 200, para poner un msj de creado
const newPosts = (postCard) => {
  return fetch("http://localhost:8081/api/posts/create", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      title: postCard.title,
      body: postCard.body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const getPost = (urlId) => {
  return fetch("http://localhost:8081/api/posts/edit/" + urlId);
};

//TODO: VER ESTO EN DONDE PONERLOS credentials: "include",
const getPostSlug = (slug) => {
  return fetch("http://localhost:8081/api/posts/" + slug, {
    credentials: "include",
  });
};

const updatePost = (postCard) => {
  return fetch("http://localhost:8081/api/posts/" + postCard._id, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      title: postCard.title,
      body: postCard.body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const deletePost = (urlId) => {
  return fetch("http://localhost:8081/api/posts/" + urlId, {
    method: "DELETE",
    credentials: "include",
  });
};

module.exports = {
  getPosts,
  newPosts,
  getPost,
  updatePost,
  deletePost,
  getPostSlug,
  getUserPosts,
};
