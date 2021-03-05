import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Button, {ButtonProps, ButtonSize, ButtonType} from './button';


const defaultProps = {
  onClick: jest.fn()
}

const testProps:ButtonProps = {
  btnType:ButtonType.Primary,
  size:ButtonSize.small,
  className:'class',
}

const disabledProps:ButtonProps = {
  disabled:true,
  onClick:jest.fn()
}

describe('test Button Component',()=>{
  it('should render the correct default Button',()=>{
    const wrapper = render(<Button {...defaultProps}>Hello</Button>)
    const element = wrapper.getByText('Hello') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeFalsy()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props',()=>{
    const wrapper = render(<Button {...testProps}>Hello</Button>)
    const element = wrapper.getByText('Hello')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-sm class')

  })
  it('should render a link when btnType is link and href is provided',()=>{
    const wrapper = render(<Button btnType={ButtonType.Link} href='http://dummyurl'>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')

  })
  it('should render disabled button when disabled set to true',()=>{
    const wrapper = render(<Button {...disabledProps}>Hello</Button>)
    const element = wrapper.getByText('Hello') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toBeCalled()
  })
})