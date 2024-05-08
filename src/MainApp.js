import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllProductsPage from './pages/AllProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function MainApp() {
  return (
    <Router>
      <div className="MainApp">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">All Products</a></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact>
            <h1>Welcome to the Top Products App</h1>
          </Route>
          <Route path="/products" exact>
            <AllProductsPage />
          </Route>
          <Route path="/products/:productId">
            <ProductDetailsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default MainApp;
