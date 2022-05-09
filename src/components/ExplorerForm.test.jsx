import { screen } from "@testing-library/react";
import { renderInRoute, renderWithRouter } from "../utils/renderUtils";
import ExplorerForm from "./ExplorerForm";

describe("Unit Tests for ExplorerForm", () => {
  test("renders form", () => {
    renderWithRouter(ExplorerForm);
    const name = screen.getByRole("textbox", { name: /Nombre/i });
    const username = screen.getByRole("textbox", { name: /Username/i });
    const mission = screen.getByRole("textbox", { name: /Mission/i });
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(mission).toBeInTheDocument();
  });

  test("fields are enabled if id is new", () => {
    renderInRoute(ExplorerForm, "/explorers/:id", "/explorers/new");
    const name = screen.getByRole("textbox", { name: /Nombre/i });
    const username = screen.getByRole("textbox", { name: /Username/i });
    const mission = screen.getByRole("textbox", { name: /Mission/i });
    expect(name).toBeEnabled();
    expect(username).toBeEnabled();
    expect(mission).toBeEnabled();
  });

  test("renders add button if id is new", () => {
    renderInRoute(ExplorerForm, "/explorers/:id", "/explorers/new");
    const addButton = screen.getByRole("button", { name: /Agregar/i });
    expect(addButton).toBeInTheDocument();
  });

  test("fields are disabled if editing an explorer", () => {
    renderInRoute(ExplorerForm, "/explorers/:id", "/explorers/1");
    const name = screen.getByRole("textbox", { name: /Nombre/i });
    const username = screen.getByRole("textbox", { name: /Username/i });
    expect(name).toBeDisabled();
    expect(username).toBeDisabled();
  });

  test("renders update button if editing an explorer", () => {
    renderInRoute(ExplorerForm, "/explorers/:id", "/explorers/1");
    const updateButton = screen.getByRole("button", { name: /Actualizar/i });
    expect(updateButton).toBeInTheDocument();
  });

  test("renders delete button if editing an explorer", () => {
    renderInRoute(ExplorerForm, "/explorers/:id", "/explorers/1");
    const deleteButton = screen.getByRole("button", { name: /Eliminar/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
