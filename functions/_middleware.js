// 全ページ共通のフッターに、絵本読み聞かせYouTubeチャンネル「アンマ」の動画を
// 自己紹介(PR)として挿入するCloudflare Pages Function。
// 既存の108以上のHTMLファイルを1つずつ編集する代わりに、配信時にエッジで差し込む。

const PROMO_HTML = `
<div style="max-width:420px;margin:0 auto 16px;padding:12px;border:1px solid #ddd;border-radius:8px;background:#fafafa;text-align:center;font-family:'Hiragino Sans','Yu Gothic',sans-serif;">
<p style="font-size:11px;color:#999;margin:0 0 6px;letter-spacing:0.05em;">PR</p>
<a href="https://www.youtube.com/watch?v=aii_4RUE3QY" target="_blank" rel="noopener" style="text-decoration:none;color:#222;display:block;">
<img src="https://img.youtube.com/vi/aii_4RUE3QY/mqdefault.jpg" alt="赤ちゃん喜ぶ絵本読み聞かせ★アンマ" style="width:100%;max-width:320px;border-radius:6px;display:block;margin:0 auto;" loading="lazy">
<p style="font-size:13px;margin:8px 0 2px;font-weight:bold;">赤ちゃん喜ぶ絵本読み聞かせ★アンマ</p>
<p style="font-size:12px;color:#0366d6;margin:0;">▶ 【いっしょに歯磨き】を見る</p>
</a>
</div>
`;

class FooterInjector {
  element(element) {
    element.prepend(PROMO_HTML, { html: true });
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }
  return new HTMLRewriter().on("footer", new FooterInjector()).transform(response);
}
