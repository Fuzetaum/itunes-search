import { Layout as AntLayout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import './index.scss';

const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout id="layout-container">
      <Header >iTunes Album Search</Header>
      <Content>{children}</Content>
    </AntLayout>
  );
};

Layout.propTypes = { children: PropTypes.node };

export default Layout;
