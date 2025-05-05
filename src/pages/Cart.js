import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert, Spinner, Form } from 'react-bootstrap';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import './Cart.css';

function Cart() {
  const {
    cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart
  } = useCart();

  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState({ street: '', city: '', zip: '', phone: '' });

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

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

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setAlertMessage('Pro dokončení objednávky se musíte přihlásit!');
      setTimeout(() => setAlertMessage(''), 3000);
      return;
    }
    setIsCheckingOut(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const order = {
        items: cart,
        total: totalPrice(),
        address,
        date: new Date().toLocaleString()
      };
      setOrderDetails(order);
      clearCart();
      setIsCheckingOut(false);
      setIsLoading(false);
      setAlertMessage('Objednávka byla úspěšně odeslána!');
      setTimeout(() => setAlertMessage(''), 5000);
    }, 1500);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="cart-page">
      <Header />
      <Container className="cart-container">
        <h2 className="cart-title">Nákupní košík</h2>
        {alertMessage && <Alert variant={alertMessage.includes('přihlásit') ? 'danger' : 'success'}>{alertMessage}</Alert>}

        {isLoading ? (
          <div className="loading-spinner"><Spinner animation="border" /><p>Načítání...</p></div>
        ) : orderDetails ? (
          <OrderConfirmation order={orderDetails} />
        ) : (
          <Row>
            <Col md={8}>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Váš košík je prázdný</p>
                  <Button variant="outline-dark" href="/catalog" className="mt-3">Zpět do obchodu</Button>
                </div>
              ) : (
                <>
                  <ListGroup className="cart-items mb-4">
                    {cart.map(item => (
                      <ListGroup.Item key={item.id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <h5>{item.name}</h5>
                            <p>Cena: {item.price} Kč</p>
                          </Col>
                          <Col md={3}>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              className="quantity-input"
                            />
                            <span>ks</span>
                          </Col>
                          <Col md={3} className="text-end">
                            <Button variant="outline-danger" onClick={() => handleRemove(item.id)}>Odstranit</Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {isCheckingOut && (
                    <Card className="checkout-form mb-4">
                      <Card.Body>
                        <h4>Doručovací údaje</h4>
                        <Form onSubmit={handleSubmitOrder}>
                          <Form.Group className="mb-3">
                            <Form.Label>Ulice a číslo domu</Form.Label>
                            <Form.Control type="text" name="street" value={address.street} onChange={handleAddressChange} required />
                          </Form.Group>
                          <Row className="mb-3">
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>Město</Form.Label>
                                <Form.Control type="text" name="city" value={address.city} onChange={handleAddressChange} required />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>PSČ</Form.Label>
                                <Form.Control type="text" name="zip" value={address.zip} onChange={handleAddressChange} required />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="mb-4">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control type="tel" name="phone" value={address.phone} onChange={handleAddressChange} required />
                          </Form.Group>
                          <Button variant="dark" type="submit" className="w-100 py-3">Potvrdit objednávku</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  )}
                </>
              )}
            </Col>

            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Souhrn objednávky</Card.Title>
                  <Card.Text>Celková částka: <strong>{totalPrice().toFixed(2)} Kč</strong></Card.Text>
                  <Card.Text>Počet položek: <strong>{totalItems}</strong></Card.Text>
                  <Button
                    variant="dark"
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                  >
                    {isLoggedIn ? 'Pokračovat k platbě' : 'Přihlásit se k platbě'}
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

function OrderConfirmation({ order }) {
  return (
    <Card className="order-confirmation">
      <Card.Body>
        <div className="text-center mb-4">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
            10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 
            1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor" />
          </svg>
          <h3 className="mt-3">Děkujeme za objednávku!</h3>
        </div>
        <div className="order-details">
          <p><strong>Datum:</strong> {order.date}</p>
          <p><strong>Adresa:</strong> {order.address.street}, {order.address.city}, {order.address.zip}</p>
          <p><strong>Telefon:</strong> {order.address.phone}</p>
          <h5 className="mt-4">Položky</h5>
          <ListGroup variant="flush">
            {order.items.map(item => (
              <ListGroup.Item key={item.id} className="px-0">
                <div className="d-flex justify-content-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toFixed(2)} Kč</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-between mt-3 fw-bold">
            <span>Celkem:</span>
            <span>{order.total.toFixed(2)} Kč</span>
          </div>
        </div>
        <Button variant="outline-dark" href="/catalog" className="w-100 mt-4">Zpět do obchodu</Button>
      </Card.Body>
    </Card>
  );
}

export default Cart;
