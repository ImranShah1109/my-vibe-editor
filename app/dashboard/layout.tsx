import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playground = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    NEXTJS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    EXPRESSJS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    VUE: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    HONO: "https://hono.dev/favicon.ico",
    ANGULAR:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    // NODEJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  };

  const formattedPlaygroundData = playground?.map((item) => ({
    id: item.id,
    name: item.title,
    starred:
      item.Starmark.filter((star) => star.playgroundId === item.id).length > 0,
    icon: technologyIconMap[item.template] || "Code2",
  }));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* @ts-ignore */}
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
