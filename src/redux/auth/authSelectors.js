const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUsername = state => state.auth.user.name;
const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

const selectors = {
  getIsLoggedIn,
  getUsername,
  getIsFetchingCurrentUser,
};

export default selectors;
