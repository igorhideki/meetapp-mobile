import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import createRouter from '~/routes';

Icon.loadFont();

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  console.tron.log('signed', signed);
  const Routes = createRouter(signed);

  return <Routes />;
}
