export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
      {
        userAgent: ["Googlebot", "Applebot", "Bingbot"],
        allow: ["/"],
      },
    ],
    sitemap: "https://zg0ul.com/sitemap.xml",
    host: "https://zg0ul.com",
  };
}
