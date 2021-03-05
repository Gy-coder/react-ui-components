import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Alert, {AlertType} from './components/Alert/alert';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
import Menu, {ModeType} from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

library.add(fas);




function App() {
  return (
    <>
      <Button><Icon icon="align-right"></Icon></Button>
      <Button onClick={() => {console.log('Hello');}}>Hello</Button>
      <Button size={ButtonSize.small} btnType={ButtonType.Danger}>Small Size</Button>
      <Button size={ButtonSize.large}>Large Size</Button>
      <Button disabled>Disabled</Button>
      <Button btnType={ButtonType.Link} href={'http://baidu.com'}>Link</Button>
      <Button btnType={ButtonType.Link} disabled>Disabled Link</Button>
      <br/>
      <div style={{width: '500px', padding: '20px 40px'}}>
        <Alert title={'this is alert'} description='this is description' onClose={()=>{alert('Alert has been deleted')}}/>
      </div>
      <Icon icon='arrow-down' theme='warning'/>
      <Menu defaultIndex={0} onSelect={(index)=>alert(index)} mode={ModeType.Horizontal}>
        <MenuItem>active</MenuItem>
        <MenuItem>zzz</MenuItem>
        <MenuItem>xyz</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <SubMenu title="父组件">
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
}

export default App;
