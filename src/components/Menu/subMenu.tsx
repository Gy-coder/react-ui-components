import React, {useContext, useState} from 'react';
import classnames from 'classnames';
import {MenuContext, ModeType} from './menu';
import {MenuItemProps} from './menuItem';


export interface SubMenuProps {
  index?: number,
  title: string,
  className?: string,
}


const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {index, title, className, children} = props;
  const context = useContext(MenuContext);
  console.log(context);
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index
  });
  const [menuOpen, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  console.log(context.mode);
  const clickEvents = context.mode === ModeType.Vertical ?
    {onClick: handleClick} : {};
  const hoverEvents = context.mode !== ModeType.Vertical ?
    {onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true);}, onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false);}}
    : {};
  const renderChildren = () => {
    const SubMenuClasses = classnames('sub-menu', {
      'menu-opened': menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if (displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error('Waring:SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <ul className={SubMenuClasses}>
        {childrenComponent}
      </ul>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};


SubMenu.displayName = 'SubMenu';
export default SubMenu;