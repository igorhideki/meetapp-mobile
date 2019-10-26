import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Content,
  Title,
  Info,
  InfoText,
  ButtonWrapper,
} from './styles';

export default function Meetup({ data, children }) {
  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} />

      <Content>
        <Title>{data.title}</Title>

        <Info>
          <Icon name="event" size={14} color="#999" />
          <InfoText>{data.dateFormatted}</InfoText>
        </Info>

        <Info>
          <Icon name="place" size={14} color="#999" />
          <InfoText>{data.location}</InfoText>
        </Info>

        <Info>
          <Icon name="person" size={14} color="#999" />
          <InfoText>Organizador: {data.user.name}</InfoText>
        </Info>

        {!!children && <ButtonWrapper>{children}</ButtonWrapper>}
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    dateFormatted: PropTypes.string,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

Meetup.defaultProps = {
  children: null,
};
