import { dispatch, req } from "../app.js";

export default {
  name: "products",
  actions: {
    create: () => dispatch({ type: "CREATE", payload: "100" }),
    add: () => dispatch({ type: "ADD" }),
    write: json => dispatch({ type: "WRITE", payload: json }),
    error: json => dispatch({ type: "ERROR", payload: json }),
    // fetchData: async function() {
    //   const data = await fetch(
    //     "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
    //   );
    //   const dataJSON = await data.json();
    //   const payload = dataJSON._embedded.episodes;
    //   this.write(payload);
    // }
    fetchData: function(cbu, body) {
      const payload = req.post({
        api: "info",
        params: "86295423",
        body: body,
        pass: [200, 201],
        errorFunc: this.error
      });
      this.write(payload);
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
