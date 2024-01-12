import React, { useMemo } from 'react';
import {Divider, Space, notification } from 'antd';
const Context = React.createContext({
  name: 'Default',
});
const BsNoti = (props) => {
  let {open , close} = props
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Enter Email`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Space>
       { open ?  openNotification('topRight') : null}
      </Space>
      <Divider />
      
    </Context.Provider>
  );
};
export default BsNoti;