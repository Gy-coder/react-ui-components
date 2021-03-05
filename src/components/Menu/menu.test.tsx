import React from 'react';
import {render,RenderResult,fireEvent,cleanup} from '@testing-library/react';
import Menu, {MenuProps, ModeType} from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: ModeType.Vertical,
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );

};

let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement;

describe('test menu and menuItem component', () => {
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct menu and menuItem', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test menu-horzontal')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  });
  it('click item should change active and call right callback', () => {
    const thirdElement:HTMLElement = wrapper.getByText('xyz')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    fireEvent.click(activeElement)
    expect(activeElement).toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(0)
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  });
});