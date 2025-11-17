import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import PreConfirmacao from "./pages/PreConfirmacao";
import Validacao from "./pages/Validacao";
import Vagas from "./pages/Vagas";
import Chat from "./pages/Chat";
import Confirmacao from "./pages/Confirmacao";
import LoadingValidacao from "./pages/LoadingValidacao";
import ValidacaoCep from "./pages/ValidacaoCep";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path="/cpf" component={Home} />
      <Route path="/validacao" component={Validacao} />
      <Route path="/loading-validacao" component={LoadingValidacao} />
      <Route path="/validacao-cep" component={ValidacaoCep} />
      <Route path="/vagas" component={Vagas} />
      <Route path="/pre-confirmacao" component={PreConfirmacao} />
      <Route path="/chat" component={Chat} />
      <Route path="/confirmacao" component={Confirmacao} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
