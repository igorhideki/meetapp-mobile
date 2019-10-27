import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 20px;
  height: 50px;
  background: ${props =>
    props.editable === false
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 4px;
  opacity: ${props => (props.editable === false ? 0.6 : 1)};
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  flex: 1;
  font-size: 18px;
  color: #fff;
`;
