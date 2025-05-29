export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/dashboard/"],
    },
    sitemap: "https://zg0ul.com/sitemap.xml",
    host: "https://zg0ul.com",
  };
}
