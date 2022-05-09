import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ExplorersList from "./ExplorersList";

describe("Unit Tests for ExplorersList", () => {
  test("renders explorers list", () => {
    render(
      <BrowserRouter>
        <ExplorersList />
      </BrowserRouter>
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("renders select message on initial render", () => {
    render(
      <BrowserRouter>
        <ExplorersList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Selecciona un explorer/i)).toBeInTheDocument();
  });
});
