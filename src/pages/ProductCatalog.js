import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useCart } from '../components/CartContext';
import Header from '../components/Header';
import './ProductCatalog.css';

function ProductCatalog() {
  const [products] = useState([
    // Čaje
    { 
      id: 1, 
      name: 'Bylinný čaj Lesní vůně', 
      description: 'Směs bylin z českých luk a lesů', 
      price: 129, 
      imgUrl: '/images/bylintea.jpg',
      category: 'čaj'
    },
    { 
      id: 2, 
      name: 'Ovocný čaj Lesní plody', 
      description: 'Ovocná směs s malinami a borůvkami', 
      price: 139, 
      imgUrl: '/images/jahodatee.jpg',
      category: 'čaj'
    },
    { 
      id: 3, 
      name: 'Zelený čaj s mátou', 
      description: 'Svěží kombinace zeleného čaje a máty', 
      price: 149, 
      imgUrl: '/images/matatea.jpg',
      category: 'čaj'
    },
    { 
      id: 16, 
      name: 'Černý čaj Earl Grey', 
      description: 'Klasický černý čaj s bergamotem', 
      price: 159, 
      imgUrl: '/images/tmav.jpg',
      category: 'čaj'
    },
    { 
      id: 17, 
      name: 'Bílý čaj s broskví', 
      description: 'Jemný bílý čaj s příchutí broskve', 
      price: 169, 
      imgUrl: '/images/broskvecaj.jpg',
      category: 'čaj'
    },
    
    // Svíčky
    { 
      id: 4, 
      name: 'Vosková svíčka Les', 
      description: 'Přírodní svíčka s vůní jehličí', 
      price: 199, 
      imgUrl: '/images/les-svic.jpg',
      category: 'svíčky'
    },
    { 
      id: 5, 
      name: 'Svíčka Medový vosk', 
      description: 'Ručně dělaná svíčka z včelího vosku', 
      price: 249, 
      imgUrl: '/images/med-svic.jpg',
      category: 'svíčky'
    },
    { 
      id: 6, 
      name: 'Svíčka Borový les', 
      description: 'Vůně čerstvého borového lesa', 
      price: 229, 
      imgUrl: '/images/les-bor.jpg',
      category: 'svíčky'
    },
    { 
      id: 7, 
      name: 'Svíčka Dubová kůra', 
      description: 'Těžká dřevitá vůně dubového lesa', 
      price: 259, 
      imgUrl: '/images/dub-svic.jpg',
      category: 'svíčky'
    },
    { 
      id: 8, 
      name: 'Svíčka Lesní jahoda', 
      description: 'Sladká vůně lesních jahod', 
      price: 219, 
      imgUrl: '/images/jahoda-svic.jpg',
      category: 'svíčky'
    },
    { 
      id: 9, 
      name: 'Svíčka Houby po dešti', 
      description: 'Čerstvá vůně lesa po dešti', 
      price: 239, 
      imgUrl: '/images/dest-svic.jpg',
      category: 'svíčky'
    },
    
    // Dekorace
    { 
      id: 10, 
      name: 'Dřevěná miska', 
      description: 'Ručně vyrobená miska z dubového dřeva', 
      price: 399, 
      imgUrl: '/images/miska.jpg',
      category: 'dekorace'
    },
    { 
      id: 11, 
      name: 'Dřevěná váza', 
      description: 'Minimalistická váza z břízy', 
      price: 459, 
      imgUrl: '/images/vaza.jpg',
      category: 'dekorace'
    },
    { 
      id: 12, 
      name: 'Dřevěný podnos', 
      description: 'Praktický podnos z ořechového dřeva', 
      price: 529, 
      imgUrl: '/images/podnos.jpg',
      category: 'dekorace'
    },
    { 
      id: 13, 
      name: 'Dřevěná lžíce', 
      description: 'Ručně vyřezávaná kuchyňská lžíce', 
      price: 179, 
      imgUrl: '/images/lzice.jpg',
      category: 'dekorace'
    },
    { 
      id: 14, 
      name: 'Dřevěný svícen', 
      description: 'Moderní svícen z masivního dřeva', 
      price: 349, 
      imgUrl: '/images/svicen.jpg',
      category: 'dekorace'
    },
    { 
      id: 15, 
      name: 'Dřevěná deska', 
      description: 'Deska na krájení z akátového dřeva', 
      price: 279, 
      imgUrl: '/images/deska.jpg',
      category: 'dekorace'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('všechno');
  const [alertMessage, setAlertMessage] = useState('');
  const { addToCart } = useCart();

  const categories = ['všechno', ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === 'všechno' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertMessage(`${product.name} byl přidán do košíku`);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  return (
    <div className="catalog-page">
      <Header />
      
      <Container className="catalog-container">
        <h1 className="main-title mb-5">Náš přírodní sortiment</h1>
        
        <div className="category-filter mb-5" style={{ marginTop: '30px' }}>
          <h3 className="filter-title">Filtrovat podle kategorie:</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'dark' : 'outline-dark'}
                onClick={() => setActiveCategory(category)}
                className="me-2 mb-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <h2 className="section-title mb-4">
          {activeCategory === 'všechno' ? 'Všechny produkty' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        
        {alertMessage && (
          <Alert variant="success" className="text-center">
            {alertMessage}
          </Alert>
        )}

        <Row className="g-4">
          {filteredProducts.map(product => (
            <Col key={product.id} xl={3} lg={4} md={6}>
              <Card className="product-card h-100">
                <div className="product-img-container">
                  <Card.Img 
                    variant="top" 
                    src={product.imgUrl} 
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="product-name">{product.name}</Card.Title>
                  <Card.Text className="product-description">
                    {product.description}
                  </Card.Text>
                  <Card.Text className="product-price mt-auto">
                    {product.price} Kč
                  </Card.Text>
                  <Button 
                    variant="outline-dark" 
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Přidat do košíku
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
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

export default ProductCatalog;