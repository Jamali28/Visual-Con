import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const [ideas, totalUsers, totalPremium] = await Promise.all([
    prisma.contentIdea.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
    prisma.contentIdea.count({ where: { isPremium: true } }),
  ]);

  const stats = {
    totalIdeas: ideas.length,
    totalUsers,
    totalPremium,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage your content and monitor platform growth.
          </p>
        </div>
        
        <AdminDashboard initialIdeas={ideas} stats={stats} />
      </div>
    </div>
  );
}
