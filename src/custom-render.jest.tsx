import { render } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import { BrowserRouter } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const ThemedComponent = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Tractor injectStyle>{children}</Tractor>;
    </BrowserRouter>
  );
};

export const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: { providerProps: {}; libraryOptions: {} }
) => {
  return render(ui, {
    wrapper: (props) => (
      <ThemedComponent {...props} {...options?.providerProps} />
    ),
    ...options?.libraryOptions,
  });
};

export * from "@testing-library/react";

export { customRender as render };
