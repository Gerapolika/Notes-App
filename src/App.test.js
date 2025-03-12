import { fireEvent, screen } from "@testing-library/react";
import App from "./App";
import renderWithProviders from "./helpers/testHelpers/renderWithRedux";

describe("App component", () => {
  test("renders todos title", () => {
    renderWithProviders(<App />);
    const TodosElement = screen.getByText("Todos");
    expect(TodosElement).toBeInTheDocument();
  });

  test("change input value", () => {
    const { inputValue } = renderWithProviders(<App />);

    fireEvent.change(screen.getByPlaceholderText("What needs to be done?"), {
      target: { value: inputValue },
    });
  });

  test("check buttons", () => {
    renderWithProviders(<App />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });
});
