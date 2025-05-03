import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import './Contacts.css';

function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setError('Všechny údaje jsou povinné.');
      return;
    }

    setTimeout(() => {
      setError('');
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="contacts-page">
      <Header />
      
      <Container className="contacts-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="contact-card">
              <h2 className="contact-title">Kontakty</h2>

              {error && <Alert variant="danger" className="contact-alert">{error}</Alert>}
              {success && <Alert variant="success" className="contact-alert">Vaše zpráva byla odeslána!</Alert>}

              <h4 className="section-title">Pošlete nám zprávu</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Jméno</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zadejte své jméno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Zadejte svůj email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Předmět</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Předmět zprávy"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Zpráva</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Napište svou zprávu"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>
                <Button variant="outline-secondary" type="submit" className="submit-btn">
                  Odeslat zprávu
                </Button>
              </Form>
            </Card>

            <Card className="contact-card mt-4">
              <h4 className="section-title">Kontaktní informace</h4>
              <p className="contact-info"><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a></p>
              <p className="contact-info"><strong>Telefon:</strong> +420 123 456 789</p>
              <p className="contact-info"><strong>Adresa:</strong> Ulice 123, Město, PSČ 12345</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contacts;