import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo-container">
        <img
          className="bandLogo"
          src={`${import.meta.env.BASE_URL}/images/bold-bandlogo.png`}
          alt="Band Logo"
        />
      </div>
      <div 
        className="art-container"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/joudy-bandPic.jpg)`,
          backgroundPosition: "50% 58%",
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat",
        }}
      >
        
      </div>
    </header>
  );
};

export default Header;
