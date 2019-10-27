import React, { useState, useMemo, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Button from '~/components/Button';
import {
  Container,
  DateSelector,
  PrevButton,
  NextButton,
  DateText,
  List,
  Helper,
  HelperText,
  Loading,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNoMoreMeetups, setHasNoMoreMeetups] = useState(false);
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('meetups', { params: { date, page: 1 } });

      if (response.data.length) {
        const data = response.data.map(meetup => {
          return {
            ...meetup,
            dateFormatted: format(
              parseISO(meetup.date),
              "d 'de' MMMM, 'às' H'h'",
              {
                locale: pt,
              }
            ),
          };
        });
        setMeetups(data);
      } else {
        setHasNoMoreMeetups(true);
      }
      setLoading(false);
    }

    loadMeetups();
  }, [date]);

  useEffect(() => {
    setMeetups([]);
    setHasNoMoreMeetups(false);
    setPage(1);
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function loadMoreMeetups() {
    if (hasNoMoreMeetups || loading) return;

    setLoading(true);

    const response = await api.get('meetups', {
      params: { date, page: page + 1 },
    });

    if (response.data.length) {
      const data = response.data.map(meetup => {
        return {
          ...meetup,
          dateFormatted: format(
            parseISO(meetup.date),
            "d 'de' MMMM, 'às' H'h'",
            {
              locale: pt,
            }
          ),
        };
      });

      setPage(page + 1);
      setMeetups([...meetups, ...data]);
    } else {
      setHasNoMoreMeetups(true);
    }
    setLoading(false);
  }

  return (
    <Background>
      <Container>
        <Header />

        <DateSelector>
          <PrevButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </PrevButton>
          <DateText>{dateFormatted}</DateText>
          <NextButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </NextButton>
        </DateSelector>

        {meetups.length ? (
          <List
            data={meetups}
            keyExtractor={meetup => String(meetup.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreMeetups}
            renderItem={({ item }) => (
              <Meetup data={item}>
                {!item.past && (
                  <Button onPress={() => {}}>Realizar inscrição</Button>
                )}
              </Meetup>
            )}
          />
        ) : (
          !loading && (
            <Helper>
              <HelperText>Ainda não há meetups para esta data.</HelperText>
            </Helper>
          )
        )}

        {loading && (
          <Loading>
            <ActivityIndicator />
          </Loading>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
