import { useNavigate } from 'react-router-dom';
import profilePic from './jessaLogo.png';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
    //also maybe call function that clears cache of projects?
  };

    return (
      <header className="header">
        <img
          className="profile-img"
          src={profilePic}
          alt="profile"
        />
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </header>
    );
  }

export default Header;