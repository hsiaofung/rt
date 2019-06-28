import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    // this.props.send();
  }
  render() {
    return (
      <div className="App">
        {console.log(this.props.name)}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    name: state.products.name
  };
};
const mapDispatchToProps = dispatch => {
  console.log("dispatch", dispatch);
  return {
    // send: () => dispatch(send())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
