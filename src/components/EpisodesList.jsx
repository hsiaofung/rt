import React from "react";
export default function EpisodesList(props) {
  const { episodes, toggleFavAction, favourites } = props;

  return episodes.map(episode => {
    return (
      <section key={episode.id} className="episode-box">
        {console.log("episode.image", episode.image)}
        <img
          src={episode.image != null ? episode.image.medium : undefined}
          alt={`Rick and Morty ${episode.name}`}
        />
        <div>{episode.name}</div>
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            Season: {episode.season} Number: {episode.number}
          </div>
          <button type="button" onClick={() => toggleFavAction(episode)}>
            {favourites.find(fav => fav.id === episode.id) ? "Unfav" : "Fav"}
          </button>
        </section>
      </section>
    );
  });
}