import { authState } from "@/atoms/authState";
import withProtectedPage from "@/components/hocs/withProtectedPage";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginPage from "./login";

function HomePage() {
  const auth = useRecoilValue(authState);
  return (
    <div>
      <div>{JSON.stringify(auth)}</div>
      <NavLink to="/logout">
        <Button type="primary">logout</Button>
      </NavLink>
    </div>
  );
}

export default withProtectedPage(HomePage, LoginPage);
