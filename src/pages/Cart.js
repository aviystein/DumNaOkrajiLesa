import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import './Cart.css';

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice
  } = useCart();

  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = (id) => {
    setIsLoading(true);
    removeFromCart(id);
    setAlertMessage('Produkt byl odstraněn z košíku!');
    setIsLoading(false);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    setIsLoading(true);
    updateQuantity(id, quantity);
    setIsLoading(false);
  };

  return (
    <div className="cart-page">
      <Header />
      
      <Container className="cart-container">
        <h2 className="cart-title">Nákupní košík</h2>
        {alertMessage && <Alert variant="success" className="cart-alert">{alertMessage}</Alert>}

        {isLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
            <p>Načítání...</p>
          </div>
        ) : (
          <Row>
            <Col md={8}>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Váš košík je prázdný</p>
                </div>
              ) : (
                <ListGroup className="cart-items">
                  {cart.map((item) => (
                    <ListGroup.Item key={item.id} className="cart-item">
                      <Row className="align-items-center">
                        <Col md={6}>
                          <h5 className="item-name">{item.name}</h5>
                          <p className="item-price">Cena: {item.price} Kč</p>
                        </Col>
                        <Col md={3}>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="quantity-input"
                          />
                          <span className="quantity-label">ks</span>
                        </Col>
                        <Col md={3} className="text-end">
                          <Button 
                            variant="outline-danger" 
                            onClick={() => handleRemove(item.id)}
                            className="remove-btn"
                          >
                            Odstranit
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>

            <Col md={4}>
              <Card className="summary-card">
                <Card.Body>
                  <Card.Title className="summary-title">Souhrn objednávky</Card.Title>
                  <Card.Text className="summary-total">
                    Celková částka: <strong>{totalPrice().toFixed(2)} Kč</strong>
                  </Card.Text>
                  <Card.Text className="summary-items">
                    Počet položek: <strong>{totalItems}</strong>
                  </Card.Text>
                  <Button 
                    variant="dark" 
                    className="checkout-btn" 
                    disabled={cart.length === 0}
                  >
                    Pokračovat k platbě
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Cart;