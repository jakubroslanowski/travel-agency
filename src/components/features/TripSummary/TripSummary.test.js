import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link without crashing', () => {
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id="abc" tags={['test', 'test']} />);
    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(expectedLink);
  });
  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });
  it('check if img has correct src and alt', () => {
    const component = shallow(
      <TripSummary image="src" name="alt" tags={['test', 'test']} />
    );
    expect(component.find('img').prop('src')).toEqual('src');
    expect(component.find('img').prop('alt')).toEqual('alt');
  });
  it('check if props: name, cost and days are rendering correctly', () => {
    const component = shallow(
      <TripSummary
        name="Example name"
        cost="$52,342,81"
        days={5}
        tags={['test', 'test']}
      />
    );
    expect(component.find('.title').text()).toEqual('Example name');
    expect(component.find('.details').childAt(0).text()).toEqual('5 days');
    expect(component.find('.details').childAt(1).text()).toEqual(
      'from $52,342,81'
    );
  });
  it('check if tags are rendered in the right order', () => {
    const expectedTags = ['test1', 'test2', 'test3'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    for (let tag in expectedTags) {
      const renderedTag = component.find('.tag').at(tag).text();
      expect(renderedTag).toEqual(expectedTags[tag]);
    }
  });
  it('should throw error when no tags', () => {
    const component = shallow(<TripSummary tags={[]} />);
    const checkedDiv = component.find('.tags').exists();
    expect(checkedDiv).toEqual(true);
  });
});
