export type ApiError = { code: string; message: string };

export function toError(status: number, code: string, message: string) {
  return { status, body: { error: { code, message } as ApiError } };
}
