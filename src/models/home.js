import { dispatch, req } from "../app";

const initialState = { episodes: [], favourites: [], isComplete: false };

export default {
  name: "home",
  actions: {
    addFav: payload => dispatch({ type: "ADD_FAV", payload }),
    removeFav: payload => dispatch({ type: "REMOVE_FAV", payload }),
    fetchData: payload => dispatch({ type: "FETCH_DATA", payload }),
    fetchDataAction: async function() {
      const data = await req.get({
        credentials: "omit",
        api: "episodes",
        headers: {}
      });
      const payload = data._embedded.episodes;
      this.fetchData(payload);
    }
  },
  reducers: function(state = initialState, action) {
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
