import { fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "../../helpers/testHelpers/renderWithRedux";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer component", () => {
  it("Check button on footer", () => {
    const handleOnClick = jest.fn();
    renderWithProviders(<Footer />);

    const activeBtn = screen.queryByText("Active");
    expect(activeBtn).toBeInTheDocument();

    const allBtn = screen.queryByText("All");
    expect(allBtn).toBeInTheDocument();

    const completedBtn = screen.queryByText("Completed");
    expect(completedBtn).toBeInTheDocument();

    expect(activeBtn).toHaveClass("footer__buttons__btn");

  });
});
