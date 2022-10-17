import { AuthTypes } from "@/models/auth";
import useSWR from "swr";
import { mockFetcher, mocksApi } from "./api";

export async function postLogin(formData: AuthTypes.Login) {
  // return await api.request<AuthTypes.Login, AuthTypes.LoginResponse>({ url: "/", data: formData});
  return await mocksApi.request<String, AuthTypes.LoginResponse>({
    url: "/login/success.json",
    method: "GET"
  });
}

export function useIntrospect(accessToken: string | null) {
  const { data, error } = useSWR<AuthTypes.GetIntrospectResponse>(
    "/introspect/success.json",
    mockFetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
