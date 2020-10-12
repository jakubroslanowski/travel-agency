import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripName, tripId, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  const { name, contact } = options;
  if (name.length < 1) {
    window.alert('Enter your name');
    return;
  }
  if (contact.length < 1) {
    window.alert('Enter contact info');
    return;
  }

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

function OrderForm({
  options,
  tripCost,
  setOrderOption,
  tripName,
  tripId,
  countryCode,
}) {
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
        <Button
          onClick={() =>
            sendOrder(options, tripCost, tripName, tripId, countryCode)
          }
        >
          Order now!
        </Button>
      </Col>
    </Row>
  );
}
OrderForm.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
  setOrderOption: PropTypes.func,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;
