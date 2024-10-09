import profilePic from './jessaLogo.png';
import './Header.css';

function Header() {
    return (
      <header className="header">
        <img
          className="profile-img"
          src={profilePic}
          alt="profile"
        />
        <button className="signout-btn">Sign Out</button>
      </header>
    );
  }

export default Header;