import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/productCard';
import Filters from '../components/Filters';
import { fetchProducts } from '../services/productService';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: 'Laptop', company: 'AMZ' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts(filters.company, filters.category, 10, 1, 10000);
      setProducts(data);
    };
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Filters categories={['Laptop', 'Phone', 'Tablet']} handleFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <Row>
            {products.map(product => (
              <Col key={product.productId} md={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProductsPage;
