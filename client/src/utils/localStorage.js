export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {}
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const setTokens = ({ token, refreshToken }) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("jwtRefreshToken", refreshToken);
};

export const removeTokens = ({ token, refreshToken }) => {
  localStorage.removeItem("jwtToken", token);
  localStorage.removeItem("jwtRefreshToken", refreshToken);
};

export const getTokens = () => {
  return {
    token: localStorage.getItem("jwtToken"),
    refreshToken: localStorage.getItem("jwtRefreshToken")
  };
};
