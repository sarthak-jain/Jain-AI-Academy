import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  courseSchema,
  moduleSchema,
  lessonFrontmatterSchema,
  type Course,
  type Lesson,
  type ModuleWithLessons,
  type CourseWithModules,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "courses");

export function getCourses(): Course[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const courseDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  return courseDirs
    .map((dir) => {
      const courseFile = path.join(CONTENT_DIR, dir.name, "course.json");
      if (!fs.existsSync(courseFile)) return null;
      const raw = JSON.parse(fs.readFileSync(courseFile, "utf-8"));
      return courseSchema.parse({ ...raw, slug: dir.name });
    })
    .filter((c): c is Course => c !== null)
    .sort((a, b) => a.order - b.order);
}

export function getCourse(slug: string): Course | null {
  const courseFile = path.join(CONTENT_DIR, slug, "course.json");
  if (!fs.existsSync(courseFile)) return null;
  const raw = JSON.parse(fs.readFileSync(courseFile, "utf-8"));
  return courseSchema.parse({ ...raw, slug });
}

export function getModules(courseSlug: string): ModuleWithLessons[] {
  const modulesDir = path.join(CONTENT_DIR, courseSlug, "modules");
  if (!fs.existsSync(modulesDir)) return [];

  const moduleDirs = fs
    .readdirSync(modulesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  return moduleDirs
    .map((dir) => {
      const moduleFile = path.join(modulesDir, dir.name, "module.json");
      if (!fs.existsSync(moduleFile)) return null;
      const raw = JSON.parse(fs.readFileSync(moduleFile, "utf-8"));
      const mod = moduleSchema.parse({ ...raw, slug: dir.name });
      const lessons = getLessons(courseSlug, dir.name);
      return { ...mod, lessons };
    })
    .filter((m): m is ModuleWithLessons => m !== null)
    .sort((a, b) => a.order - b.order);
}

export function getLessons(courseSlug: string, moduleSlug: string): Lesson[] {
  const moduleDir = path.join(CONTENT_DIR, courseSlug, "modules", moduleSlug);
  if (!fs.existsSync(moduleDir)) return [];

  const mdxFiles = fs
    .readdirSync(moduleDir)
    .filter((f) => f.endsWith(".mdx"));

  return mdxFiles
    .map((file) => {
      const filePath = path.join(moduleDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = lessonFrontmatterSchema.parse(data);
      const slug = file.replace(/\.mdx$/, "");
      return { frontmatter, slug, content, moduleSlug, courseSlug };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): Lesson | null {
  const filePath = path.join(
    CONTENT_DIR,
    courseSlug,
    "modules",
    moduleSlug,
    `${lessonSlug}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = lessonFrontmatterSchema.parse(data);
  return { frontmatter, slug: lessonSlug, content, moduleSlug, courseSlug };
}

export function getCourseWithModules(slug: string): CourseWithModules | null {
  const course = getCourse(slug);
  if (!course) return null;
  const modules = getModules(slug);
  return { ...course, modules };
}

export function getAllLessonPaths(): {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}[] {
  const courses = getCourses();
  const paths: { courseSlug: string; moduleSlug: string; lessonSlug: string }[] = [];

  for (const course of courses) {
    const modules = getModules(course.slug);
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        paths.push({
          courseSlug: course.slug,
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }

  return paths;
}
