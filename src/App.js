import React, { useState, Fragment } from 'react';
import { Menu, Icon } from 'antd';

import NoContextApp from 'NoContextApp';
import ContextApp from 'ContextApp';

const NO_CONTEXT_APP = 'NO_CONTEXT_APP';
const CONTEXT_APP = 'CONTEXT_APP';

const App = () => {
  const [current, setCurrent] = useState(NO_CONTEXT_APP);

  const handleClick = e => setCurrent(e.key);

  return (
    <Fragment>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key={NO_CONTEXT_APP}>
          <Icon type="dislike" />
          No Context App
        </Menu.Item>
        <Menu.Item key={CONTEXT_APP}>
          <Icon type="like" />
          Context App
        </Menu.Item>
      </Menu>
      {current === NO_CONTEXT_APP ? (
        <NoContextApp />
      ) : current === CONTEXT_APP ? (
        <ContextApp />
      ) : null}
    </Fragment>
  );
};

export default App;
