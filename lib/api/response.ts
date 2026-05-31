export type ApiSuccess<T> = { ok: true; data: T };
export type ApiError = { ok: false; error: string; code?: string };
export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function apiSuccess<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function apiError(error: string, code?: string): ApiError {
  return { ok: false, error, code };
}
