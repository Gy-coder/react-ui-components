import React from 'react';
import {render,fireEvent} from '@testing-library/react';
import Alert, {AlertProps, AlertType} from './alert';


const testProps: AlertProps = {
  title: 'test alert',
  onClose: jest.fn(),
};
const describeProps: AlertProps = {
  title: 'test alert',
  onClose: jest.fn(),
  description: 'this is describe'
};

describe('test alert component', () => {
  it('test default alert component', () => {
    const wrapper = render(<Alert {...testProps}></Alert>);
    const AlertElement = wrapper.getByTestId('test-alert');
    expect(AlertElement).toBeInTheDocument();
    expect(AlertElement).toHaveClass('alert alert-default');
    expect(AlertElement).toContainHTML(`<div class="alert alert-default" data-testid="test-alert"><span class="title">${testProps.title}</span><span class="closeButton">关闭</span></div>`);

  });
  it('test description', () => {
    const wrapper = render(<Alert {...describeProps}></Alert>);
    const AlertElement = wrapper.getByTestId('test-alert');
    expect(AlertElement).toBeInTheDocument();
    expect(AlertElement).toContainHTML(`<div class="alert alert-default" data-testid="test-alert"><span class="title">test alert</span><span class="closeButton">关闭</span><p class="description">${describeProps.description}</p></div>`);
  });
  it('whether alert can close', () => {
    const wrapper = render(<Alert {...testProps}></Alert>);
    const closeButton = wrapper.getByText('关闭');
    console.log(closeButton.innerHTML);
    fireEvent.click(closeButton);
    expect(testProps.onClose).toHaveBeenCalled();
  });
  it('should change success', () => {
    const wrapper = render(<Alert type={AlertType.Success} {...testProps}></Alert>);
    const AlertElement = wrapper.getByTestId('test-alert');
    expect(AlertElement).toHaveClass('alert alert-success')
  });
  it('should change waring', () => {
    const wrapper = render(<Alert type={AlertType.Warning} {...testProps}></Alert>);
    const AlertElement = wrapper.getByTestId('test-alert');
    expect(AlertElement).toHaveClass('alert alert-warning')
  });
  it('should change danger', function () {
    const wrapper = render(<Alert type={AlertType.Danger} {...testProps}></Alert>);
    const AlertElement = wrapper.getByTestId('test-alert');
    expect(AlertElement).toHaveClass('alert alert-danger')
  });
});