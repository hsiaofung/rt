// export default {
//   name: "products",
//   state: {},
//   reducers: {
//     delete(state, { payload: id }) {
//       return state.filter(item => item.id !== id);
//     }
//   }
// };

export default {
  name: "products",
  state: {},
  reducers: function(state = { name: "AAAA" }, action) {
    switch (action) {
      case "RECEIVE_MYBAGS":
        return {
          ...state,
          ...action.payload,
          name: "BBBB"
        };
      default:
        return state;
    }
  }
};
