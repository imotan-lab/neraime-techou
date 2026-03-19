document.addEventListener("DOMContentLoaded", async () => {
  try {
    const params = new URLSearchParams(location.search);
    const slug = params.get("slug");
    if (!slug) return;

    const res = await fetch("assets/data/machines.json");
    const machines = await res.json();
    const m = machines.find((x) => x.slug === slug);
    if (!m) return;

    const siteName = "うちどころ。";
    const baseTitle = (m.seo && m.seo.title) ? m.seo.title : m.name;
    const fullTitle = `${baseTitle} 天井・狙い目・やめどき・設定判別まとめ | ${siteName}`;
    document.title = fullTitle;

    const strategy = m.strategy || "詳細準備中";
    const description = `${m.name}の天井・狙い目・やめどき・設定判別をまとめた攻略ページです。狙い目チェッカーとポチポチくんに対応。現在の狙い目目安は${strategy}。`;
    const pageUrl = `${location.origin}${location.pathname}?slug=${encodeURIComponent(slug)}`;

    function ensureMeta(selector, attrs) {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
        document.head.appendChild(el);
      }
      return el;
    }

    ensureMeta('meta[name="description"]', { name: "description" }).setAttribute("content", description);
    ensureMeta('meta[property="og:title"]', { property: "og:title" }).setAttribute("content", fullTitle);
    ensureMeta('meta[property="og:description"]', { property: "og:description" }).setAttribute("content", description);
    ensureMeta('meta[property="og:type"]', { property: "og:type" }).setAttribute("content", "article");
    ensureMeta('meta[property="og:url"]', { property: "og:url" }).setAttribute("content", pageUrl);
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" }).setAttribute("content", fullTitle);
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description" }).setAttribute("content", description);
  } catch (e) {
    console.log(e);
  }
});
