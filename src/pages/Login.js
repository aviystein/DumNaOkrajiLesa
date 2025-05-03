import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Login.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!email || !password || (isRegistering && (!firstName || !lastName || !confirmPassword))) {
      setError('Vyplňte prosím všechna pole.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('Hesla se neshodují.');
        return;
      }

      if (users.some(user => user.email === email)) {
        setError('Uživatel s tímto emailem již existuje.');
        return;
      }

      users.push({ firstName, lastName, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setError('');
      alert('Registrace proběhla úspěšně! Nyní se můžete přihlásit.');
      setIsRegistering(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setError('');
        navigate('/catalog');
      } else {
        setError('Neplatné přihlašovací údaje.');
      }
    }
  };

  return (
    <div className="login-page">
      <Header />
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="auth-card shadow">
              <Card.Body>
                <h2 className="auth-title text-center mb-4">
                  {isRegistering ? 'Registrace' : 'Přihlášení'}
                </h2>
                
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  {isRegistering && (
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Jméno</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Zadejte své jméno"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Příjmení</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Zadejte své příjmení"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Zadejte email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Heslo</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Zadejte heslo"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </Form.Group>

                  {isRegistering && (
                    <Form.Group className="mb-4">
                      <Form.Label>Potvrzení hesla</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Zadejte heslo znovu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </Form.Group>
                  )}

                  <Button 
                    variant="dark" 
                    type="submit" 
                    className="auth-btn w-100 py-2"
                  >
                    {isRegistering ? 'Registrovat se' : 'Přihlásit se'}
                  </Button>
                </Form>

                <div className="auth-switch text-center mt-4">
                  <p className="mb-0">
                    {isRegistering ? 'Máte již účet?' : 'Nemáte účet?'}{' '}
                    <Button 
                      variant="link" 
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="auth-link"
                    >
                      {isRegistering ? 'Přihlásit se' : 'Registrovat se'}
                    </Button>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;