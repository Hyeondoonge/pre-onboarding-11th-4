import { TResult } from 'types/common';
import axios from 'axios';

if (!process.env.REACT_APP_API_END_POINT) {
  throw new Error('REACT_APP_API_END_POINT 환경 변수를 선언해주세요!');
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  headers: { 'Content-Type': 'application/json' }
});

export const getResult = async (keyword: string): Promise<TResult> => {
  try {
    console.info('calling api');
    const res = await instance.get(`/sick?q=${encodeURIComponent(keyword)}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
