import { render } from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";

export function renderWithRouter(Component) {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
}

export function renderInRoute(Component, path, route) {
  const history = createMemoryHistory();
  history.push(route);
  render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path={path} element={<Component />} />
      </Routes>
    </Router>
  );
}
