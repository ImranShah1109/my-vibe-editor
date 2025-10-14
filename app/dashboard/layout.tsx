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
    REACT: "/react.svg",
    //   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    NEXTJS: "/nextjs-icon.svg",
    //   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    EXPRESSJS: "/expressjs-icon.svg",
    //   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    VUE: "/vuejs-icon.svg",
    //"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    HONO: "/hono.svg", //"https://hono.dev/favicon.ico",
    ANGULAR: "/angular-2.svg",
    //   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    // NODEJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  };

  const formattedPlaygroundData = playground?.map((item) => ({
    id: item.id,
    name: item.title,
    starred:
      item.Starmark.filter((star) => star.playgroundId === item.id).length > 0,
    icon: technologyIconMap[item.template] || "/code.svg",
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
