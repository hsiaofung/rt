// export default {
//   name: "miniCart",
//   state: {},
//   reducers: {
//     delete(state, { payload: id }) {
//       return state.filter(item => item.id !== id);
//     }
//   }
// };

export default {
  name: "miniCart",
  state: {},
  reducers: function(state = {}, action) {
    switch (action) {
      case "START":
        return {
          ...state,
          ...action.payload,
          isUpdate: false
        };
      default:
        return state;
    }
  }
};
