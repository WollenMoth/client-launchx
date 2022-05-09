import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders navbar brand", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const brand = screen.getByRole("link", { name: /Launch X/i });
  expect(brand).toBeInTheDocument();
});
