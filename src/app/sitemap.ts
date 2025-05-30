import { createClient } from "@/lib/supabase/server";


export default async function sitemap() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, updated_at");

  const projectUrls =
    projects?.map((project) => ({
      url: `https://zg0ul.com/projects/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || [];

  return [
    {
      url: "https://zg0ul.com",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://zg0ul.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://zg0ul.com/projects",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "https://zg0ul.com/awards",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://zg0ul.com/resume",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...projectUrls,
  ];
}
