import React, { useContext, useState } from "react";
import { GithubContext } from "../context/context";
import styled from "styled-components";
import { MdBusiness, MdLocationOn, MdLink } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
const Card = () => {
  const { githubUser } = useContext(GithubContext);
  const {
    avatar_url,
    html_url,
    name,
    company,
    blog,
    login,
    bio,
    location,
    twitter_username,
  } = githubUser;

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const stored = JSON.parse(localStorage.getItem("favorites")) || [];
  const already = stored.find((item) => item.login === login);
  const toggleFavorite = () => {
    const already = favorites.find((item) => item.login === login);
    if (!already) {
      const updated = [...stored, { login, avatar_url, html_url }];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated); // update UI
      alert(`${login} telah ditambahkan ke favorit!`);
    } else {
      const confirmDelete = window.confirm(
        `${login} sudah ada di favorit. Hapus dari favorit?`
      );
      if (confirmDelete) {
        const updated = stored.filter((item) => item.login !== login);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated); // update UI
        alert(`${login} telah dihapus dari favorit.`);
      }
    }
  };
  return (
    <Wrapper>
      <header>
        <img src={avatar_url} alt={name} />
        <div>
          <h4>{name}</h4>
          <p>@{twitter_username || "octavianusfian"}</p>
        </div>
        <button className="favorite" onClick={toggleFavorite}>
          {!already ? <MdFavoriteBorder /> : <MdFavorite />}
        </button>
        <a href={html_url}>follow</a>
      </header>
      <p className="bio">{bio}</p>
      <div className="links">
        <p>
          <MdBusiness /> {company}
        </p>
        <p>
          <MdLocationOn /> {location || "earth"}
        </p>

        <a href={`https://${blog}`}>
          <MdLink />
          {blog}
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: "user";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 0.9fr auto auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .favorite {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default Card;
