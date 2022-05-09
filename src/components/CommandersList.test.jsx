import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CommandersList from "./CommandersList";

describe("Unit Tests for CommandersList", () => {
  test("renders commanders list", () => {
    render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders select message on initial render", () => {
    render(
      <BrowserRouter>
        <CommandersList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Selecciona un commander/i)).toBeInTheDocument();
  });
});
