import { render } from '@testing-library/react';
import { ElementType } from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

export function renderWithRouter(Component: ElementType) {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
}

export function renderInRoute(
  Component: ElementType,
  path: string,
  route: string
) {
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={<Component />} />
      </Routes>
    </MemoryRouter>
  );
}
