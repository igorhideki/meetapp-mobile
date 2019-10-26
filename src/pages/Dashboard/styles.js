import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const DateSelector = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const PrevButton = styled.TouchableOpacity``;

export const NextButton = styled.TouchableOpacity``;

export const DateText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Helper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HelperText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const Loading = styled.View`
  margin: 20px 0;
`;
