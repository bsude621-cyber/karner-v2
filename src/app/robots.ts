import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Tüm arama motorları + AI botları açık.
 * AI botlar ayrı listelenir çünkü bazıları "User-agent: *" kuralını
 * kendi adlarına özel kural aramadan önce uygulamaz; açık allow, GEO
 * (ChatGPT/Claude/Perplexity/Gemini görünürlüğü) için sigortadır.
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_BOTS,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
