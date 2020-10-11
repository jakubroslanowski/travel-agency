import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name="abc" type="abcd" />);
    expect(component).toBeTruthy();
  });
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
  it('should render prop name in the title', () => {
    const component = shallow(<OrderOption name="abc" type="dropdown" />);
    expect(component.find('.title').text()).toEqual('abc');
  });
});
const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};
const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;
for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent
            .find('select')
            .simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'checkboxes': {
        it('contains div.checkboxes and input type checkbox', () => {
          const div = renderedSubcomponent.find('.checkboxes');
          expect(div.length).toBe(1);
          const input = div.find('input[type="checkbox"]');
          expect(input.length).toBe(mockProps.values.length);
          expect(input.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(input.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent
            .find(`input[value="${testValue}"]`)
            .simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: [mockProps.currentValue, testValue],
          });
        });
        break;
      }
      case 'icons': {
        it('contains div with icons', () => {
          const icon = renderedSubcomponent.find('.icon');
          expect(icon.length).toBe(3);
          const emptyIcon = renderedSubcomponent.find('.icon[value=""]').length;
          expect(emptyIcon).toBe(1);
          const icons = renderedSubcomponent.find('.icon').not('[value=""]');
          expect(icons.length).toBe(mockProps.values.length);
          const iconName = icons.find('Icon');
          expect(iconName.at(0).prop('name')).toBe(mockProps.values[0].icon);
          expect(iconName.at(1).prop('name')).toBe(mockProps.values[1].icon);
          expect(icons.at(0).childAt(1).text()).toBe(mockProps.values[0].name);
          expect(icons.at(0).childAt(3).text()).toBe(
            `$` + mockProps.values[0].price
          );
          expect(icons.at(1).childAt(1).text()).toBe(mockProps.values[1].name);
          expect(icons.at(1).childAt(3).text()).toBe(
            `$` + mockProps.values[1].price
          );
        });
        it('should run setOptionValue function on click', () => {
          const icon = renderedSubcomponent.find('.icon').at(2);
          icon.simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'number': {
        it('contains input with numbers', () => {
          const number = renderedSubcomponent.find('input');
          expect(number.length).toBe(1);
          const numberDiv = renderedSubcomponent.find('div');
          expect(numberDiv.childAt(1).text()).toBe(mockProps.price);
        });
        it('should run setOptionValue on change', () => {
          renderedSubcomponent
            .find('input')
            .simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValueNumber,
          });
        });
        break;
      }
      case 'text': {
        it('contains input in which you can enter text', () => {
          const text = renderedSubcomponent.find('input');
          expect(text.length).toBe(1);
        });
        it('should run setOptionValue function on change', () => {
          renderedSubcomponent
            .find('input')
            .simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
      case 'date': {
        it('should run handleChange function', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: testValue,
          });
        });
        break;
      }
    }
  });
}
