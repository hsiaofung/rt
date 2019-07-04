import React from "react";
import { app } from "../app.js";

class Home extends React.Component {
  componentDidMount() {
    console.log("api", app.getApi().info);
    console.log("api", app.getApi().wishList);
  }
  render() {
    return <p>AAAAA</p>;
  }
}
export default Home;
