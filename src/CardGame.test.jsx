import { render, fireEvent } from "@testing-library/react";
import CardGame from "./CardGame";

test("renders without crashing", () => {
  render(<CardGame />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<CardGame />);
  expect(asFragment()).toMatchSnapshot();
});
