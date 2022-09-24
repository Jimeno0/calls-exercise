import { Tractor } from "@aircall/tractor";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomeView, LoginView, DetailView, ErrorView } from "./views";
import { AuthProvider, ApolloProvider, CallsContextProvider } from "./contexts";
import { ProtectedRoute } from "./components";
import { PATHS } from "./constants";

const App = () => {
  return (
    <BrowserRouter>
      <Tractor injectStyle>
        <ApolloProvider>
          <AuthProvider>
            <CallsContextProvider>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path={PATHS.home} element={<HomeView />} />
                  <Route path={PATHS.detail} element={<DetailView />} />
                </Route>
                <Route path={PATHS.login} element={<LoginView />} />
                <Route path="*" element={<ErrorView />} />
              </Routes>
            </CallsContextProvider>
          </AuthProvider>
        </ApolloProvider>
      </Tractor>
    </BrowserRouter>
  );
};

export default App;
