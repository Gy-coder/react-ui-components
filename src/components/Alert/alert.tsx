import React from 'react';
import classNames from 'classnames';

export enum AlertType {
  Default = 'default',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  title: string,
  description?: string,
  onClose?: () => void,
  closeAble?: boolean,
  className?: string,
  type?: AlertType,
}

export type AlertProps = Partial<BaseAlertProps & HTMLDivElement>
const Alert: React.FC<AlertProps> = (props) => {
  const {title, description, onClose, closeAble, type, className} = props;
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  });
  let divRef: HTMLElement | null = null;
  const handleClick = () => {
    divRef && divRef.remove();
    onClose && onClose();
  };
  return (
    <div className={classes} ref={(div) => divRef = div} data-testid='test-alert'>
      <span className='title'>{title}</span>
      {closeAble && <span className='closeButton' onClick={() => handleClick()}>关闭</span>}
      {description && <p className='description'>{description}</p>}
    </div>
  );
};

Alert.defaultProps = {
  type: AlertType.Default,
  closeAble: true,
};

export default Alert;