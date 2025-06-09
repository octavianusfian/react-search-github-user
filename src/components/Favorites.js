import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (login) => {
    const updated = favorites.filter((user) => user.login !== login);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          ⭐ Favorites User
        </h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">There is no favorites.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map(({ login, avatar_url, html_url }) => (
              <div
                key={login}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={avatar_url}
                  alt={login}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{login}</h3>
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm mt-1 hover:underline"
                >
                  See on github
                </a>
                <button
                  onClick={() => removeFavorite(login)}
                  className="mt-4 text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-700"
          >
            🔍 Back to search
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
