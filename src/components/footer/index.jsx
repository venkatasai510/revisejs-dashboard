import React from "react";
import "./footer.scss";
import Logo from "../../assets/images/footerLogo.png";
import fb from "../../assets/images/fb.svg";
import insta from "../../assets/images/insta.svg";
import twitter from "../../assets/images/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <a href="/">
          <img src={Logo} alt="logo" />
        </a>
        <p>
          ​Revise offers developers the rails to program NFTs to interact with
          apps and data.
        </p>
        <ul>
          <li>
            <a href="/">Knowledge Base</a>
          </li>
          <li>
            <a href="/">Get Started</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
          <li>
            <a href="/">FAQs</a>
          </li>
        </ul>

        <div className="socialMedia">
          <a href="/">
            <img src={fb} alt="fb" />
          </a>
          <a href="/">
            <img src={twitter} alt="twitter" />
          </a>
          <a href="/">
            <img src={insta} alt="insta" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
