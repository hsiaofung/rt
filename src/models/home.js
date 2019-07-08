import { dispatch } from "../app.js";


export default {
  name: "home",
  actions: {
    addFav: payload => dispatch({ type: "ADD_FAV", payload }),
    removeFav: payload => dispatch({ type: "REMOVE_FAV", payload }),
    fetchDataAction: async () => {
      const data = await fetch(
        "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
      );
      const dataJSON = await data.json();
      const payload = dataJSON._embedded.episodes;
      dispatch({ type: "FETCH_DATA", payload });
    }
  },
  reducers: function(
    state = { episodes: [], favourites: [], isComplete: false },
    action
  ) {
    console.log("state.favourites", state.favourites);
    switch (action.type) {
      case "FETCH_DATA":
        return { ...state, episodes: action.payload, isComplete: true };
      case "ADD_FAV":
        return {
          ...state,
          favourites: [...state.favourites, action.payload]
        };
      case "REMOVE_FAV":
        return {
          ...state,
          favourites: action.payload
        };
      default:
        return state;
    }
  }
};
