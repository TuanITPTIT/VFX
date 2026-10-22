export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/** Call explicitly once backend endpoints exist. Importing this file makes no requests. */
export async function apiClient<T>(path: string, options: RequestInit = {}): Promise<T | undefined> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!baseUrl) throw new Error("Chưa cấu hình NEXT_PUBLIC_API_URL.");
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Đường dẫn API phải bắt đầu bằng một dấu /.");
  }

  const headers = new Headers(options.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const response = await fetch(`${baseUrl.replace(/\/+$/, "")}${path}`, { ...options, headers });
  if (!response.ok) throw new ApiError(response.status, `Yêu cầu API thất bại (${response.status}).`);
  if (response.status === 204) return undefined;
  return response.json() as Promise<T>;
}
