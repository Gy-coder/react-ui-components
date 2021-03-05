import React, {createContext, useState} from 'react';
import classnames from 'classnames';
import {MenuItemProps} from './menuItem';

export enum ModeType {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

type selectCallBack = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string,
  className?: string,
  mode?: ModeType,
  style?: React.CSSProperties,
  onSelect?: selectCallBack
}

interface IMenuContext {
  index: string ,
  onSelect?: selectCallBack,
  mode ?: ModeType,
  defaultOpenSubMenus ?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = (props) => {
  const {defaultIndex, className, mode, style, onSelect, children} = props;
  const [curActive, setActive] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: curActive ? curActive : '0',
    onSelect: handleClick,
    mode : mode === ModeType.Vertical ?  ModeType.Vertical: ModeType.Horizontal
  };
  const classes = classnames('menu', className, {
    'menu-vertical': mode === ModeType.Vertical,
    'menu-horzontal': mode === ModeType.Horizontal
  });
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement,{index:index.toString()});
      } else {
        // return childElement
        console.error('Waring:Menu has a child which is not a MenuItem component');
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: ModeType.Horizontal,
};

export default Menu;