import { TCachedResult } from 'types/common';

export const isCachedResult = (data: any | TCachedResult): data is TCachedResult => {
  if (!('expired_time' in data)) return false;
  if (!('result' in data)) return false;
  if (Array.isArray(data.result)) return false;

  for (const item of data) {
    if (!('sickCd' in item)) return false;
    if (!('sickNm' in item)) return false;
  }
  return true;
};

export const isValidateExpiredTime = (expired_time: number): boolean => {
  const currentTime = Date.now();
  return currentTime < expired_time;
};
