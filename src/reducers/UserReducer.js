export const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      // http://localhost:8000/token-auth/
      // action.data <-- response {'profile': {id: ..}, 'token': '...','user': {'username': 'jason'}}
      // console.log("action", action)
      return {
        id: action.data.user.id,
        username: action.data.user.username,
        token: action.data.token,
        garden: action.data.garden,
        profile: action.data.profile
      }
    case 'TOKEN_USER':
      // http://localhost:8000/gardens/current_user/
      // action.data <-- response {'username': 'jason'}
      console.log("TOKEN_USER: ", action)
      return {
        id: action.data.user.id,
        username: action.data.user.username,
        token: action.data.token,
        garden: action.data.garden,
        profile: action.data.profile
      }
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}