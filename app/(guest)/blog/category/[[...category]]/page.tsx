import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/constants/blog";
import type { BlogPost } from "@/constants/blog";
import { Button } from "@/components/ui/button";

// Filter Data
function postsInCategoryPath(posts: BlogPost[], categoryPath: string[]): BlogPost[] {
  return posts.filter((post) => {
    for (let i = 0; i < categoryPath.length; i++) {
      if (!post.category.includes(categoryPath[i])) return false;
    }

    return true;
  });
}

function categoryDisplayName(path: string[]): string {
  return path.map((slug) => BLOG_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug).join(" /");
}

export default async function BlogCategory({ params }: { params: Promise<{ category: string[] }> }) {
  const { category } = await params;
  let filteredPost: BlogPost[] = [];

  if (category) {
    filteredPost = postsInCategoryPath(BLOG_POSTS, category);
  }

  return (
    <div className="py-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline mb-4">
        <ArrowLeft className="w-4 text-muted-foreground" />
        Back to Blog
      </Link>

      <h1 className="text-3xl font-bold mb-2">Category: {category ? categoryDisplayName(category): ""}</h1>
      <p className="text-muted-foreground mb-6">
        {filteredPost.length} post{filteredPost.length !== 1 ? "s" : ""} in this category
      </p>

      <div className="mt-6 flex gap-3 mb-4">
        <Link href="/blog">
          <Button variant="outline">All Posts</Button>
        </Link>

        {BLOG_CATEGORIES.map((category) => (
          <Link key={category.slug} href={`/blog/category/${category.slug}`}>
            <Button variant="outline">{category.name}</Button>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredPost.length === 0 ? (
          BLOG_POSTS.map((post) => (
            <Link key={post.id} href="#">
              <div className="border rounded-lg p-4 hover:bg-muted/50">
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-muted-foreground text-base mt-1">{post.overview}</p>
                <p className="text-sm text-muted-foreground mt-2">{post.date} • {post.author}</p>
              </div>
            </Link>
          ))
        ) : (
          filteredPost.map((post) => (
            <Link key={post.id} href={`./blog/${post.slug}`}>
              <div className="border rounded-lg p-4 hover:bg-muted/50">
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-muted-foreground text-base mt-1">{post.overview}</p>
                <p className="text-sm text-muted-foreground mt-2">{post.date} • {post.author}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}