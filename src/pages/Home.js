import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Header from '../components/Header';
import './Home.css';

function Home() {
  const products = [
    {
      title: "Ručně vyráběné svíčky",
      text: "Přírodní voskové svíčky s esenciálními oleji, ručně odlévané ve skleněných nádobách. Každá svíčka hoří až 50 hodin a provoní celou místnost příjemnou vůní.",
      img: "./images/svicki.jpg"
    },
    {
      title: "Dřevěné dekorace",
      text: "Originální kousky vyrobené z lokálně získaného dřeva. Každý kus je unikátní a nese přirozenou kresbu dřeva. Ideální pro doplnění interiéru v přírodním stylu.",
      img: "./images/decor.jpg"
    },
    {
      title: "Přírodní bylinné čaje",
      text: "Ručně sbírané a sušené bylinky z českých luk a lesů. Nabízíme čistě přírodní směsi bez přísad, které podpoří vaše zdraví a dokonale vás zklidní.",
      img: "./images/caji.jpg"
    }
  ];

  return (
    <div className="home-page">
      <Header />
      
      {/* Hero */}
      <section className="hero-banner">
        <Container>
          <Row className="justify-content-center align-items-center" style={{height: '90vh'}}>
            <Col lg={8} className="text-center text-white">
              <h1 className="hero-title mb-4">Dům na okraji lesa</h1>
              <p className="hero-subtitle mb-4">Ručně vyráběné produkty z přírodních materiálů</p>
              <p className="hero-text lead">
                Vítejte v našem světě přírodních krás a ruční práce.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* O kompany */}
      <section className="about-section py-6 bg-dark text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="pe-lg-5">
              <div className="about-content">
                <h3 className="mb-4">Naše filosofie</h3>
                <p className="about-text mb-4">
                  Věříme, že krása spočívá v jednoduchosti a přirozenosti. Naše dílna se nachází doslova na okraji lesa, 
                  kde čerpáme inspiraci pro tvorbu jedinečných produktů.
                </p>
                <p className="about-text mb-4">
                  Používáme pouze přírodní materiály a ekologické postupy výroby. Každý kus, který opouští naši dílnu, 
                  nese kus naší duše a příběh o tom, jak vznikal.
                </p>
                <p className="about-text">
                  Spolupracujeme s lokálními dodavateli a podporujeme tradiční řemeslné techniky.
                </p>
              </div>
            </Col>
            <Col lg={6} className="about-image mt-5 mt-lg-0">
              <div className="about-img" style={{ 
                backgroundImage: "url('./images/workshop.jpg')",
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px"
              }}></div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Produkty */}
      <section className="products-section py-5 bg-white">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title text-dark mb-3">Naše produkty</h2>
              <p className="section-subtitle text-muted mb-5">Vyberte si z naší ručně vyráběné kolekce</p>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            {products.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="product-card h-100 border-0 shadow-sm">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={product.img} className="img-fluid" />
                  </div>
                  <Card.Body className="p-4">
                    <Card.Title className="mb-3">{product.title}</Card.Title>
                    <Card.Text className="text-muted">{product.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col className="text-center">
              <Button 
                variant="outline-dark" 
                size="lg" 
                className="px-5 py-3"
                href="/catalog"
              >
                Prohlédněte si naši nabídku
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
            <footer className="bg-dark text-white text-center py-4 mt-5">
        <Container>
          <Row>
            <Col>
              <p className="mb-1">© 2025 Dům na okraji lesa</p>
              <p className="mb-0">Vytvořeno s láskou k přírodě 🌿</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Home;