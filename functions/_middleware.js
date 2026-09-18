export async function onRequest(context) {
const response = await context.next();
const contentType = response.headers.get("content-type") || "";
if (!contentType.includes("text/html")) {
return response;
}
const GA_ID = "G-QXRVR8FN3F";
class HeadInjector {
element(element) {
element.append(`<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>`, { html: true });
}
}
return new HTMLRewriter().on("head", new HeadInjector()).transform(response);
}
