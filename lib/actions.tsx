'use server';

import { api } from './axios';

interface LoginBody {
  username: string;
  password: string;
}

interface GetBody {
  id: string;
}

interface ListingBody {
  order?: 'asc' | 'desc';
  search?: string;
  offset?: number;
  limit?: number;
}

export const loginPost = async (body: LoginBody) => {
  try {
    const { data } = await api.post('/auth/login', body);
    return data;
  } catch (err: any) {
    console.error('error', err.message);
    throw err;
  }
};

export const patientList = async (body: ListingBody) => {
  try {
    const res = await fetch(`${process.env.API_URL}/patient/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (err: any) {
    console.error('error', err.message);
    throw err;
  }
};

export const patientGet = async (body: GetBody) => {
  try {
    const res = await fetch(`${process.env.API_URL}/patient/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err: any) {
    console.error('error', err.message);
    throw err;
  }
};

export const healthfundList = async (body: ListingBody) => {
  try {
    const res = await fetch(`${process.env.API_URL}/healthfund/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (err: any) {
    console.error('error', err.message);
    throw err;
  }
};

export const configList = async (body: ListingBody) => {
  try {
    const res = await fetch(`${process.env.API_URLs}/config/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (err: any) {
    console.error('error', err.message);
    throw err;
  }
};
