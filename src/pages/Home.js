import React from "react";
import { connect } from "react-redux";
import home from "../models/home";
import "./home.css";

const EpisodesList = React.lazy(() => import("../components/EpisodesList"));

class Home extends React.Component {
  componentDidMount() {
    this.props.episodes.length === 0 && this.props.fetchDataAction();
  }
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
            episodes={this.props.episodes}
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
)(Home);
