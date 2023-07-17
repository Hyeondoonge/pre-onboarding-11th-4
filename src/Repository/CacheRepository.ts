import { getResult } from 'apis/search';
import { TResult, TCachedResult } from 'types/common';
import { isCachedResult, isValidateExpiredTime } from 'utils/cache';

interface CacheRepositoryInterface {
  get: (keyword: string) => Promise<TCachedResult>;
  save: (keyword: string, result: TResult) => TCachedResult;
}

class CacheRepository implements CacheRepositoryInterface {
  #storage;

  constructor() {
    this.#storage = localStorage;
  }

  async get(keyword: string) {
    try {
      const item = this.#storage.getItem(keyword);

      if (!item) {
        const res = await getResult(keyword);
        const cachedResult = this.save(keyword, res);
        return cachedResult;
      }

      const parsedItem = JSON.parse(item);

      if (!isCachedResult(parsedItem) || !isValidateExpiredTime(parsedItem.expired_time)) {
        const res = await getResult(keyword);
        const cachedResult = this.save(keyword, res);
        return cachedResult;
      }

      return parsedItem;
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
    this.#storage.setItem(keyword, JSON.stringify(cachedResult));

    return cachedResult;
  }
}

export const cacheRepository = new CacheRepository();
