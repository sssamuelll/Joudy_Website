import FacebookSVG from "./utils/Svg/FacebookSVG";
import TiktokSVG from "./utils/Svg/TiktokSVG";
import YoutubeSVG from "./utils/Svg/YoutubeSVG";
import InstagramSVG from "./utils/Svg/InstagramSVG";
import LinktreeSVG from "./utils/Svg/LinktreeSVG";
import SpotifySVG from "./utils/Svg/SpotifySVG";

import { useState } from "react";


const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const Footer = () => {
  const [Email, setEmail] = useState('');

  const subscribe = () => {
    if (validateEmail(Email)) {
      console.log(Email);
      fetch('http://www.joudyjoudyjoudy.com/api/subscribe', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: Email }),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log('Success:', data);
            alert('Subscribed Successfully');
            setEmail('');
         })
         .catch((error) => {
           console.error('Error:', error);
         });
        } else {
          alert('Invalid Email');
        }
  }
  return (
    <footer className="footerStyle">
      <div className="subNews">
        <h1 className="container-2-title">
          NEWSLETTER <br />
          SUBSCRIPTION
        </h1>
        <div className="newsletter">
          <div className="title-subscription">
            <span>PLUG IN. TUNE OUT. GET LOUD.</span>
          </div>
          <p>
            Join the Distortion for early access to tickets, news, tour dates,
            new music, and more. Unsubscribe anytime. See how we use your
            personal data <a href="">here</a>.
          </p>
        </div>
        <div className="subscription-container">
          <input
            type="text"
            placeholder="Your Email"
            className="subscription-input" 
            onChange={(e) => setEmail(e.target.value)}
            />
          <button className="subscription-button" onClick={() => subscribe()}>
            SUBSCRIBE
          </button>
        </div>
      </div>
      <div className="footer-space"></div><ul className="footer_social">
        <li className="footer_icon">
          <a
            href="https://www.instagram.com/joudy.joudy.joudy/"
            target="_blank"
            aria-label="instagram"
          >
            <InstagramSVG />
          </a>
        </li>
        <li className="footer_icon">
          <a
            href="https://www.facebook.com/joudyofficialjoudy"
            target="_blank"
            aria-label="facebook"
          >
            <FacebookSVG />
          </a>
        </li>
        <li className="footer_icon">
          <a
            href="https://www.tiktok.com/@joudy.joudy.joudy"
            target="_blank"
            aria-label="tiktok"
          >
            <TiktokSVG />
          </a>
        </li>
        <li className="footer_icon">
          <a
            href="https://www.youtube.com/joudyju"
            target="_blank"
            aria-label="youtube"
          >
            <YoutubeSVG />
          </a>
        </li>
        <li className="footer_icon">
          <a
            href="https://linktr.ee/joudyjoudyjoudy"
            target="_blank"
            aria-label="linktree"
          >
            <LinktreeSVG />
          </a>
        </li>
        <li className="footer_icon">
          <a
            href="https://open.spotify.com/artist/1nmeC4oDESCLqcBCZRV7Dh?si=0wUULK2zRdSSsdcRKuPkEg"
            target="_blank"
            aria-label="spotify"
          >
            <SpotifySVG />
          </a>
        </li>
      </ul><div className="bottomArt-container">
        <img
          className="bandLogo"
          src={`${import.meta.env.BASE_URL}/images/bold-bandlogo-black.png`}
          alt="Band Logo" />
      </div><div className="footerBottom">
        <a href="">
          <span>©</span> 2024 JOUDY
        </a>
        <a href="">Legal Notice</a>
        <a href="">Privacy Policy</a>
        <a href="">Developed by Carlos Rey and Samuel Dario</a>
      </div>
    </footer>
  );
};

export default Footer;
