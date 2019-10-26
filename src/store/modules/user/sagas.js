import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    console.tron.log(profile);

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização fo perfil, confira seus dados!'
    );

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);