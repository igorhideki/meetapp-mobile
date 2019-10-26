import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Banner = styled.Image`
  width: auto;
  height: 150px;
`;

export const Content = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 14px;
`;

export const Info = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const InfoText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-left: 4px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 4px;
`;
