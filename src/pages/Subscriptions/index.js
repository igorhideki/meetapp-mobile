import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';
import Meetup from '~/components/Meetup';
import { Container, List, Loading } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadSubscriptions() {
    setLoading(true);

    const response = await api.get('subscriptions');

    const data = response.data.map(subscription => {
      const { id, meetup } = subscription;

      return {
        id,
        meetup: {
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.date),
            "d 'de' MMMM, 'às' H'h'",
            {
              locale: pt,
            }
          ),
        },
      };
    });
    setLoading(false);
    setSubscriptions(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancelation(id) {
    try {
      const response = await api.delete(`subscriptions/${id}`);
      console.tron.log(response);

      if (response) {
        setSubscriptions(
          subscriptions.filter(subscription => subscription.id !== id)
        );

        Alert.alert('Sucesso!', 'Sua inscrição foi cancelada');
      }
    } catch (error) {
      Alert.alert('Ops!', 'Falha ao cancelar inscrição');
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        {loading ? (
          <Loading>
            <ActivityIndicator />
          </Loading>
        ) : (
          <List
            data={subscriptions}
            keyExtractor={subscription => String(subscription.id)}
            renderItem={({ item }) => (
              <Meetup data={item.meetup}>
                <Button onPress={() => handleCancelation(item.id)} danger>
                  Cancelar inscrição
                </Button>
              </Meetup>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
