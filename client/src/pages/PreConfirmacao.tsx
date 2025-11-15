import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function PreConfirmacao() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1); // 1: loading, 2: confirmado

  useEffect(() => {
    // Simula processo de confirmação com loading de 3 segundos
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinuar = () => {
    setLocation("/chat");
  };

  return (
    <>
      <header>
        <a href="#">
          <img src="/images/govbr.png" alt="Logomarca GovBR" />
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
            {step === 1 && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h3>Processando sua solicitação...</h3>
                <p style={{ marginBottom: "30px", color: "#666" }}>
                  Aguarde enquanto confirmamos sua vaga.
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

                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            )}

            {step === 2 && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                {/* Ícone de sucesso animado */}
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
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#008C32",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      animation: "scaleIn 0.5s ease-out",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "48px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                  </div>
                </div>

                <h2
                  style={{
                    color: "#008C32",
                    fontSize: "28px",
                    marginBottom: "15px",
                    animation: "fadeIn 0.8s ease-out",
                  }}
                >
                  VAGA PRÉ-CONFIRMADA!
                </h2>

                <p
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    marginBottom: "25px",
                    lineHeight: "1.6",
                  }}
                >
                  Parabéns! Sua vaga foi pré-confirmada com sucesso.
                </p>

                <div
                  style={{
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffc107",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "25px",
                    textAlign: "left",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", color: "#856404" }}>
                    <strong>⚠️ Última etapa necessária:</strong>
                    <br />
                    <br />
                    Para finalizar sua inscrição, você precisará passar por uma
                    confirmação via chat onde iremos:
                  </p>
                  <ul
                    style={{
                      marginTop: "10px",
                      marginBottom: 0,
                      paddingLeft: "20px",
                      color: "#856404",
                      fontSize: "14px",
                    }}
                  >
                    <li>Confirmar seus horários de disponibilidade</li>
                    <li>Detalhar suas funções como Mesário 2</li>
                    <li>Validar a data: 01/03/2026</li>
                    <li>Esclarecer dúvidas sobre o processo</li>
                  </ul>
                </div>

                <div className="button-panel">
                  <button
                    className="button-continuar"
                    onClick={handleContinuar}
                    style={{
                      backgroundColor: "#008C32",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Ir para Confirmação via Chat
                  </button>
                </div>

                <style>
                  {`
                    @keyframes scaleIn {
                      0% { 
                        transform: scale(0);
                        opacity: 0;
                      }
                      50% {
                        transform: scale(1.1);
                      }
                      100% { 
                        transform: scale(1);
                        opacity: 1;
                      }
                    }
                    
                    @keyframes fadeIn {
                      0% { 
                        opacity: 0;
                        transform: translateY(20px);
                      }
                      100% { 
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                  `}
                </style>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
