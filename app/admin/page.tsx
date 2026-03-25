import { AdminFeedbackTable } from "@/components/admin-feedback-table";
import { GradientHeader } from "@/components/gradient-header";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/?sign-in=1");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user || user.role !== "admin") {
    return redirect("/");
  }

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container mx-auto">
      <GradientHeader
        title="Dashboard Admin"
        subtitle="Gerencie os feedbacks e atualize os status"
      />
      <AdminFeedbackTable posts={posts} />
    </div>
  );
}
