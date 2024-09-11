const JWT = "jwtToken";

const getJWT = () => {
  return localStorage.getItem(JWT);
};

const removeJWT = () => {
  localStorage.removeItem(JWT);
};

export { getJWT, removeJWT };
