import { render } from "@testing-library/react";
import CardDisplay from "./CardDisplay";

test("render without crashing", () => {
  render(<CardDisplay />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<CardDisplay />);
  expect(asFragment()).toMatchSnapshot();
});
