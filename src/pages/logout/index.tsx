
import { authState } from "@/atoms/authState";
import LoadingPage from "@/components/loading/LoadingPage";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";

function LogoutPage() {
  const reset = useResetRecoilState(authState);
  const auth = useRecoilValue(authState)

  useEffect(() => {
    reset();
  }, []);

  if (!auth.isAuth){
    return <Navigate to="/" />
  }

  return <LoadingPage />;
}

export default LogoutPage;
