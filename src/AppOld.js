import React from "react";
import "./App.css";
import { connect } from "react-redux";
import products from "./models/products";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.props.add}>{this.props.name}</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.products.name,
    value: state.miniCart.value
  };
};

const mapDispatchToProps = () => {
  return {
    add: () => products.actions.add(),
    fetchData: () => products.actions.fetchData()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
