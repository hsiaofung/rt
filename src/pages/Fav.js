import React from "react";
import { connect } from "react-redux";
import home from "../models/home";

const EpisodesList = React.lazy(() => import("../components/EpisodesList"));

class Fav extends React.Component {
  toggleFavAction = episode => {
    const episodeInFavourites = this.props.favourites.includes(episode);
    let dispatchObj = this.props.addFav(episode);
    if (episodeInFavourites) {
      const favouritesWithoutEpisode = this.props.favourites.filter(
        fav => fav.id !== episode.id
      );
      dispatchObj = this.props.removeFav(favouritesWithoutEpisode);
    }
    return dispatchObj;
  };
  render() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <section className="episode-layout">
          <EpisodesList
            episodes={this.props.favourites}
            favourites={this.props.favourites}
            toggleFavAction={this.toggleFavAction}
          />
        </section>
      </React.Suspense>
    );
  }
}
const mapStateToProps = state => {
  return {
    episodes: state.home.episodes,
    favourites: state.home.favourites
  };
};
const mapDispatchToProps = () => {
  return {
    fetchDataAction: () => home.actions.fetchDataAction(),
    addFav: payload => home.actions.addFav(payload),
    removeFav: payload => home.actions.removeFav(payload)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fav);
