import { getResult } from 'apis/search';
import { TResult, TCachedResult } from 'types/common';
import { isCachedResult, isValidateExpiredDate } from 'utils/cache';

interface CacheRepositoryInterface {
  get: (keyword: string) => Promise<TResult>;
  save: (keyword: string, result: TResult) => void;
}

export default class CacheRepository implements CacheRepositoryInterface {
  storage;

  constructor() {
    this.storage = localStorage;
  }

  async get(keyword: string) {
    try {
      const item = this.storage.getItem(keyword);

      if (!isCachedResult(item) || !isValidateExpiredDate(item.expired_time)) {
        const res = await getResult(keyword);
        this.save(keyword, res);
        return res;
      }

      return JSON.parse(item) as TResult;
    } catch (error) {
      // TODO: 에러 핸들링
      console.log('error');
      throw error;
    }
  }

  save(keyword: string, result: TResult) {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const expired_time = Date.now() + HOUR;

    const cachedResult: TCachedResult = { result, expired_time };
    this.storage.setItem(keyword, JSON.stringify(cachedResult));
  }
}
