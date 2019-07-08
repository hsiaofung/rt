import React from "react";
import products from "../models/products";
import { connect } from "react-redux";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    return <p>AAAAA</p>;
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
    fetchData: () => products.actions.fetchData(),
    addFav: payload => products.actions.addFav(payload),
    removeFav: payload => products.actions.removeFav(payload)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
