import { CallsView, Navbar } from "components";
import { CallsContextProvider } from "contexts";

export const HomeView = () => {
  return (
    <CallsContextProvider>
      <Navbar />
      <CallsView />
    </CallsContextProvider>
  );
};
