import React from 'react';

import { SafeArea, Container, Logo } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <>
      <SafeArea />
      <Container>
        <Logo source={logo} />
      </Container>
    </>
  );
}
