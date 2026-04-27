import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get("niche");
  const isDaily = searchParams.get("daily") === "true";

  try {
    let ideas = await prisma.contentIdea.findMany({
      where: niche ? {
        niche: {
          equals: niche,
          mode: 'insensitive'
        }
      } : {},
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (isDaily && ideas.length > 0) {
      // Deterministic shuffle based on the date
      const dateSeed = new Date().toISOString().split('T')[0]; // "2026-04-24"
      const seedNumber = dateSeed.split('-').reduce((acc, val) => acc + parseInt(val), 0);
      
      // Simple pseudo-random shuffle using the seed
      const shuffled = [...ideas].sort((a, b) => {
        const hashA = (a.id.length * seedNumber) % 10;
        const hashB = (b.id.length * seedNumber) % 10;
        return hashA - hashB;
      });
      
      return NextResponse.json(shuffled);
    }

    return NextResponse.json(ideas);
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}
