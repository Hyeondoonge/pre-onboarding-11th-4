import { getResult } from 'apis/search';
import { AxiosError } from 'axios';
import { TResult, TCachedResult, TResultResponse } from 'types/common';
import { isCachedResult, isValidateExpiredTime } from 'utils/cache';

interface CacheRepositoryInterface {
  get: (keyword: string) => Promise<TResultResponse>;
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
        return { data: cachedResult.data, error: undefined };
      }

      const parsedItem = JSON.parse(item);

      if (!isCachedResult(parsedItem) || !isValidateExpiredTime(parsedItem.expired_time)) {
        const res = await getResult(keyword);
        const cachedResult = this.save(keyword, res);
        return { data: cachedResult.data, error: undefined };
      }

      return { data: parsedItem.data, error: undefined };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          return {
            data: [],
            error: new Error('요청을 정상적으로 처리할 수 없습니다. 서버가 작동하는지 확인하세요.')
          };
        } else {
          return {
            data: [],
            error: new Error('요청 중 오류가 발생했습니다. 요청 URL을 확인하세요.')
          };
        }
      } else {
        return { data: [], error: new Error('AxiosError 이외의 알 수 없는 오류가 발생했습니다') };
      }
    }
  }

  save(keyword: string, data: TResult) {
    try {
      const SECOND = 1000;
      const MINUTE = SECOND * 60;
      const HOUR = MINUTE * 60;
      const expired_time = Date.now() + HOUR;

      const cachedResult: TCachedResult = { data, expired_time };
      this.#storage.setItem(keyword, JSON.stringify(cachedResult));
      return cachedResult;
    } catch (error) {
      throw new Error('알 수 없는 오류가 발생했습니다. 캐시 저장 기능을 확인하세요.');
    }
  }
}

export const cacheRepository = new CacheRepository();
