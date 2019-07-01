import { dispatch } from "../app.js";

export default {
  name: "products",
  actions: {
    create: () => dispatch({ type: "CREATE", payload: "100" }),
    add: () => dispatch({ type: "ADD" }),
    fetchData: () => {
      fetch(
        "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes",
        {
          credentials: "include",
          headers: { "content-type": "application/json" },
          mode: "cors"
        }
      )
        .then(res => res.json())
        .then(json => dispatch({ type: "WRITE", payload: json }));
    }
  },
  reducers: function(state = { name: "KKKK" }, action) {
    switch (action.type) {
      case "ADD":
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
