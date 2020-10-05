import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';

function OrderForm({ options, tripCost, setOrderOption }) {
  return (
    <Row>
      {pricing.map((option) => (
        <Col key={option.id} md={4}>
          <OrderOption
            {...option}
            currentValue={options[option.id]}
            setOrderOption={setOrderOption}
          />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary options={options} tripCost={tripCost} />
      </Col>
    </Row>
  );
}
OrderForm.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
