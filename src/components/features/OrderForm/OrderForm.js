import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';

function OrderForm({ options, tripCost }) {
  return (
    <Row>
      <Col xs={12}>
        <OrderSummary options={options} tripCost={tripCost} />
      </Col>
    </Row>
  );
}
OrderForm.propTypes = {
  options: PropTypes.any,
  tripCost: PropTypes.any,
};

export default OrderForm;
