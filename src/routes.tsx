import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PRESERVED = import.meta.glob("/src/pages/(_app|_404).tsx", { eager: true });
const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx", { eager: true });

const preserved: any = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, "");
  const temp: any = PRESERVED[file];
  return { ...preserved, [key]: temp.default };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  const temp: any = ROUTES[route];
  return { path, component: temp.default };
});

function App() {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["_404"] || Fragment;
  return (
    <App>
      <Routes>
        {routes.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  );
}

export default App;
