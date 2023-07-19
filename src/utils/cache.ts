import { TCachedResult } from 'types/common';

export const isCachedResult = (item: any | TCachedResult): item is TCachedResult => {
  if (!('expired_time' in item)) return false;
  if (!('data' in item)) return false;
  if (!Array.isArray(item.data)) return false;

  for (const obj of item.data) {
    if (!('sickCd' in obj)) return false;
    if (!('sickNm' in obj)) return false;
  }
  return true;
};

export const isValidateExpiredTime = (expired_time: number): boolean => {
  const currentTime = Date.now();

  return currentTime < expired_time;
};
