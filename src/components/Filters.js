import React from 'react';
import { Form } from 'react-bootstrap';

const Filters = ({ categories, handleFilterChange }) => {
  return (
    <Form>
      <Form.Select onChange={handleFilterChange}>
        {categories.map(category => (
          <option key={category}>{category}</option>
        ))}
      </Form.Select>
      {/* Add more filter options */}
    </Form>
  );
};

export default Filters;
