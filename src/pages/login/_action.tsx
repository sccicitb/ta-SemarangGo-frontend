import { postLogin } from "@/services/auth";
import { AuthTypes } from "@/models/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";

export function useAction() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const onFinish = async (formData: AuthTypes.Login) => {
    setLoading(true);
    try {
      const response = await postLogin(formData);
      const search = qs.stringify(
        {
          access_token: response.data.content.access_token
        },
        { addQueryPrefix: true }
      );
      navigate({ pathname: "/introspect", search });
    } catch (error) {}
    setLoading(false);
  };

  return {
    onFinish,
    loading
  };
}
