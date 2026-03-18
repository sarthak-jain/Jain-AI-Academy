import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { YouTubeEmbed } from "@/components/content/YouTubeEmbed";
import { Callout } from "@/components/content/Callout";
import { FileDownload } from "@/components/content/FileDownload";
import { ImageFigure } from "@/components/content/ImageFigure";

const components = {
  YouTubeEmbed,
  Callout,
  FileDownload,
  ImageFigure,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-light",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
  return content;
}
