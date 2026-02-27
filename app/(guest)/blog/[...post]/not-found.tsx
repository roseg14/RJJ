import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="py-8">
      <div className="border rounded-md p-8 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">Blog Post Not Found</h1>
        <p className="text-muted-foreground text-base mb-4">
          This blog post doesn't exist or the path is invalid.
        </p>

        <div>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}