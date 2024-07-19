const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_USERS":
      return {
        ...state,
        users: action.payload,
      };
      case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.userId),
      };
      case "EDIT_USER":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
      };
    default:
      return state;
  }
};

export default userReducer;
