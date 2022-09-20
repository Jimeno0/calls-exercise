import { Tractor } from "@aircall/tractor";
import { Routes, Route } from "react-router-dom";
import { HomeView, LoginView, DetailView, ErrorView } from "./views";
import { AuthProvider, ApolloProvider } from "./contexts";
import { ProtectedRoute } from "./components";
import { PATHS } from "./constants";

const App = () => {
  return (
    <Tractor injectStyle>
      <ApolloProvider>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={PATHS.home} element={<HomeView />} />
              <Route path={PATHS.detail} element={<DetailView />} />
            </Route>
            <Route path={PATHS.login} element={<LoginView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </Tractor>
  );
};

export default App;
