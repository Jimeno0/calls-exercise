import { Tractor } from "@aircall/tractor";
import { Routes, Route } from "react-router-dom";
import { HomeView, LoginView, DetailView, ErrorView } from "./views";
import { AuthProvider, ApolloProvider } from "./contexts";
import { ProtectedRoute } from "./components";

const App = () => {
  return (
    <Tractor injectStyle>
      <ApolloProvider>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomeView />} />
              <Route path="/detail/:callId" element={<DetailView />} />
            </Route>
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<ErrorView />} />
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    </Tractor>
  );
};

export default App;
