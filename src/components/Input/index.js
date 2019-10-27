/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TInput } from './styles';

function Input({ style, editable, ...rest }, ref) {
  console.tron.log(editable);

  return (
    <Container style={style} editable={editable}>
      <TInput {...rest} ref={ref} editable={editable} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editable: PropTypes.bool,
};

Input.defaultProps = {
  style: {},
  editable: true,
};

export default forwardRef(Input);
