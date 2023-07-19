export type TResult = { sickCd: string; sickNm: string }[];
export type TCachedResult = { result: TResult; expired_time: number };
export type TResultResponse = { data: TResult; error: unknown };
