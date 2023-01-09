import React, { useState } from "react";
import "./header.scss";
import Logo from "../../assets/images/headerLogo.png";
import host from "../../assets/images/host.svg";
import pc from "../../assets/images/pc.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <header>
      <nav className="container">
        <div className="headerContainer">
          <div className="logo">
            <Link to="/">
              {" "}
              <p>
                <img src={Logo} alt="revise" />
              </p>
            </Link>
          </div>
          <ul className={toggle ? "nav-links active" : "nav-links"}>
              <li>
                <a href="/" className="pink">
                  <img src={host} alt="host" />
                  LOCALHOST
                </a>
              </li>

            <Link to="/">
              <li>
                <p className="commonBtn">
                  <img src={pc} alt="arrow" /> READ DOCS
                </p>
              </li>
            </Link>
          </ul>
          <button
            className={toggle ? "navToggle active" : "navToggle"}
            onClick={toggleHandler}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
