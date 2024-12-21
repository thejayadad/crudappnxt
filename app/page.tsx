import ClientForm from "@/components/client-form";
import SearchForm from "@/components/search-form";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; limit?: string }>;
}) {
  // Await the searchParams promise
  const params = await searchParams;

  // Extract query parameters
  const query = params.query || null;
  const page = parseInt(params.page || "1", 10); // Default to page 1
  const limit = parseInt(params.limit || "2", 10); // Default to 2 items per page

  // Calculate the offset for pagination
  const skip = (page - 1) * limit;

  // Fetch clients with pagination
  const clients = await prisma.client.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { department: { contains: query, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { name: "asc" },
    skip, // Skip these many records
    take: limit, // Fetch only this many records
  });

  // Fetch the total number of clients for pagination controls
  const totalClients = await prisma.client.count({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { department: { contains: query, mode: "insensitive" } },
          ],
        }
      : {},
  });

  const totalPages = Math.ceil(totalClients / limit); // Calculate total pages

  return (
    <div>
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex mt-8 mb-8">
          <SearchForm query={query || ""} />
        </div>
        <ClientForm />
        <div className="flex flex-col mt-8">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "All Clients"}
          </p>
          {clients.map((client) => (
            <div className="flex flex-col mb-4" key={client.id}>
              <div>{client.name}</div>
              <div>{client.department}</div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Link
                key={index + 1}
                href={`/?query=${query || ""}&page=${index + 1}&limit=${limit}`}
                className={`px-4 py-2 border ${
                  page === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
