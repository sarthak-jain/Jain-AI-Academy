import { z } from "zod";

export const courseSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("published"),
  access: z.enum(["free", "paid"]).default("free"),
  tags: z.array(z.string()).default([]),
  order: z.number().default(0),
});

export const moduleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  order: z.number().default(0),
});

export const lessonFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().default(0),
  access: z.enum(["free", "paid"]).default("free"),
  videoUrl: z.string().optional(),
  duration: z.string().optional(),
});

export type Course = z.infer<typeof courseSchema>;
export type Module = z.infer<typeof moduleSchema>;
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;

export interface Lesson {
  frontmatter: LessonFrontmatter;
  slug: string;
  content: string;
  moduleSlug: string;
  courseSlug: string;
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface CourseWithModules extends Course {
  modules: ModuleWithLessons[];
}
