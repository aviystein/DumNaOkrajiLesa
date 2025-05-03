import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { totalItems } = useCart();

  // kontrola přihlášení uživatele
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          <h1 className="header-title">dům na okraji lesa</h1>
        </Link>
        <div className="header-links">
          <Link to="/catalog">
            <Button variant="light">Naše produkty</Button>
          </Link>
          <Link to="/contacts">
            <Button variant="light">Kontakty</Button>
          </Link>
          <Link to="/cart">
            <Button variant="light" className="cart-btn position-relative">
              Košík
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {isLoggedIn ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Odhlásit se
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="success">Přihlásit se</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;