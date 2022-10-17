import { authState } from "@/atoms/authState";
import LoadingPage from "@/components/loading/LoadingPage";
import { useIntrospect } from "@/services/auth";
import { setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function IntrospectPage() {
  const set = useSetRecoilState(authState);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isError } = useIntrospect(searchParams.get("access_token"));

  useEffect(() => {
    if (data) {
      setLocalStorage("auth.token", searchParams.get("access_token") || "");
      set({
        isAuth: true,
        userData: data.user_data,
        scope: data.scope
      });
      navigate("/");
    }
  }, [data]);

  if (isError) {
    return <Navigate to="/login" />;
  }

  return <LoadingPage />;
}

export default IntrospectPage;
