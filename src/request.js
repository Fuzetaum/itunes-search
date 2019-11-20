import axios from 'axios';

import { getAccessToken, getTokenType } from './storage';

import { API_URL } from './constants/backend';

const LOG_PREFIX = 'request -> ';

const translateError = (field) => {
  if (field === 'telephone') {
    return 'Telefone: deve conter 10 ou 11 dígitos';
  }
}

const formatRequest = (request, isError = false) => {
  if (isError) {
    if (request.data.success === false) {
      return {
        error: true,
        message: request.data.message,
      };
    }
    if (request.data.status === 400) {
      if (request.data.message === 'Bad credentials') {
        return {
          error: true,
          message: 'E-mail e/ou senha incorretos',
        };
      }
      if (request.data.error === 'Bad Request') {
        return {
          error: true,
          message: ['Por favor, corrija os erros:\n',
            ...request.data.errors.map(error => translateError(error.field))],
        };
      }
    }
    switch (request.data.message) {
      default:
        return {
          error: true,
          message: 'Houve um problema com a conexão. Por favor, tente novamente em alguns instantes.',
        };
    }
  }

  switch (request.status) {
    default:
      return request.data;
  }
};

export const get = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`);
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const secureDelete = async (url, body = undefined) => {
  try {
    const response = await axios.delete(`${API_URL}/${url}`, {
      headers: {
        'Authorization': `${getTokenType()} ${getAccessToken()}`,
        'Content-Type': !body ? undefined : 'application/json',
      },
      data: body,
    });
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const secureGet = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`, {
      headers: { 'Authorization': `${getTokenType()} ${getAccessToken()}` },
    });
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const securePost = async (url, body = undefined) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, body, {
      headers: {
        'Authorization': `${getTokenType()} ${getAccessToken()}`,
        'Content-Type': !body ? undefined : 'application/json',
      },
    });
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const securePut = async (url, body = undefined) => {
  try {
    const response = await axios.put(`${API_URL}/${url}`, body, {
      headers: {
        'Authorization': `${getTokenType()} ${getAccessToken()}`,
        'Content-Type': !body ? undefined : 'application/json',
      },
    });
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const backofficeLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/backoffice/signin`, {
      email,
      password,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const studentLogin = async (email, password, schoolId) => {
  try {
    const response = await axios.post(`${API_URL}/auth/student/signin`, {
      email,
      password,
      schoolIdentifier: schoolId,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};

export const studentSignup = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/auth/student/signup`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return formatRequest(response);
  } catch (error) {
    console.error(LOG_PREFIX, error);
    return formatRequest(error.response, true);
  }
};
