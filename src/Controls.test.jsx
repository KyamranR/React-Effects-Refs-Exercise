import { render } from "@testing-library/react";
import Controls from "./Controls";

test("renders without crashing", () => {
  render(<Controls />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<Controls />);
  expect(asFragment()).toMatchSnapshot();
});
