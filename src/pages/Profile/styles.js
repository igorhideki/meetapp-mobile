import styled from 'styled-components';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 20 },
  showVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button).attrs({
  danger: true,
})`
  margin-top: 15px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;
