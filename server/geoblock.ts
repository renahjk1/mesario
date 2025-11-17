import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

/**
 * Middleware de bloqueio geográfico
 * Permite acesso apenas de IPs brasileiros
 */

// Cache simples para evitar consultas repetidas ao mesmo IP
const ipCache = new Map<string, { country: string; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

/**
 * Obtém o IP real do cliente considerando proxies e load balancers
 */
function getClientIP(req: Request): string {
  // Verifica headers comuns de proxies/load balancers
  const forwarded = req.headers["x-forwarded-for"];
  const realIP = req.headers["x-real-ip"];
  
  if (forwarded) {
    // x-forwarded-for pode conter múltiplos IPs, pega o primeiro
    const ips = (forwarded as string).split(",");
    return ips[0].trim();
  }
  
  if (realIP) {
    return realIP as string;
  }
  
  // Fallback para o IP da conexão direta
  return req.ip || req.socket.remoteAddress || "unknown";
}

/**
 * Consulta a API de geolocalização para obter o país do IP
 */
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Verifica cache primeiro
    const cached = ipCache.get(ip);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.country;
    }

    // IPs locais/privados são considerados brasileiros (para desenvolvimento)
    if (
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.") ||
      ip.startsWith("172.16.") ||
      ip === "unknown"
    ) {
      return "BR";
    }

    // Consulta a API ip-api.com (gratuita, 45 req/min)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode`);
    
    if (!response.ok) {
      console.error(`[GeoBlock] Erro na API de geolocalização: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.status === "success") {
      const countryCode = data.countryCode;
      
      // Armazena no cache
      ipCache.set(ip, {
        country: countryCode,
        timestamp: Date.now(),
      });
      
      return countryCode;
    }
    
    return null;
  } catch (error) {
    console.error("[GeoBlock] Erro ao consultar geolocalização:", error);
    return null;
  }
}

/**
 * Middleware Express para bloqueio geográfico
 */
export async function geoblockMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const clientIP = getClientIP(req);
    
    console.log(`[GeoBlock] Verificando acesso de IP: ${clientIP}`);
    
    const country = await getCountryFromIP(clientIP);
    
    if (!country) {
      // Se não conseguir determinar o país, permite o acesso (fail-open)
      // Você pode mudar para fail-closed (bloquear) se preferir
      console.warn(`[GeoBlock] Não foi possível determinar país do IP ${clientIP}, permitindo acesso`);
      return next();
    }
    
    // Verifica se é do Brasil
    if (country === "BR") {
      console.log(`[GeoBlock] ✓ Acesso permitido - IP brasileiro: ${clientIP}`);
      return next();
    }
    
    // Bloqueia acesso de outros países
    console.log(`[GeoBlock] ✗ Acesso bloqueado - País: ${country}, IP: ${clientIP}`);
    
    // Retorna página de bloqueio
    return res.status(403).send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Acesso Restrito</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1351B4 0%, #071D41 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 100%;
            padding: 40px;
            text-align: center;
          }
          .icon {
            width: 80px;
            height: 80px;
            background: #f44336;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 40px;
            color: white;
          }
          h1 {
            color: #1351B4;
            font-size: 24px;
            margin-bottom: 15px;
          }
          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
          }
          .ip-info {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
            color: #333;
          }
          .logo {
            margin-top: 30px;
            opacity: 0.5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">🚫</div>
          <h1>Acesso Restrito</h1>
          <p>Este serviço está disponível apenas para acessos originados do Brasil.</p>
          <p>Detectamos que você está acessando de outro país.</p>
          <div class="ip-info">
            <strong>Seu IP:</strong> ${clientIP}<br>
            <strong>País detectado:</strong> ${country}
          </div>
          <div class="logo">
            <p style="font-size: 12px; color: #999;">Tribunal Regional Eleitoral</p>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("[GeoBlock] Erro no middleware:", error);
    // Em caso de erro, permite o acesso (fail-open)
    next();
  }
}

/**
 * Função para limpar cache antigo periodicamente
 */
export function startCacheCleaner() {
  setInterval(() => {
    const now = Date.now();
    const ipsToDelete: string[] = [];
    
    ipCache.forEach((data, ip) => {
      if (now - data.timestamp > CACHE_DURATION) {
        ipsToDelete.push(ip);
      }
    });
    
    ipsToDelete.forEach(ip => ipCache.delete(ip));
    
    console.log(`[GeoBlock] Cache limpo. Entradas restantes: ${ipCache.size}`);
  }, CACHE_DURATION);
}
