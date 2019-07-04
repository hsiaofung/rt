import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <header className="header">
      <div>
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episodes</p>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/faves">Favourite(s)</Link>
      </div>
    </header>
  );
};
