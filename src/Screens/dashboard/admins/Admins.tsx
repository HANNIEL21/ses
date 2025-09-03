import Mood from "@/components/Mood"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DataTable } from "./data-table"
import { columns, type User } from "./columns"
import React from "react"
import { useSelector } from "react-redux"
import { BlinkBlur } from "react-loading-indicators"
import type { RootState } from "@/store/store"


const Admins = () => {

  const [data, setData] = React.useState<User[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const { token } = useSelector((state: RootState) => state.auth)
  const baseUrl = import.meta.env.VITE_BASE_URI;

  React.useEffect(() => {
    setLoading(true);

    const eventSource = new EventSource(`${baseUrl}/stream/users?token=${token}`);

    // Handle initUsers (all users at once)
    eventSource.addEventListener("initUsers", (event) => {
      try {
        const users = JSON.parse(event.data) as User[];

        console.log("initUsers:", users);

        // filter out lecturers
        const filtered = users.filter((u) => u.role !== "LECTURER");

        setData(filtered);
      } catch (err) {
        console.error("Error parsing initUsers:", err);
      }
    });

    // Handle userUpdate (new user one by one)
    eventSource.addEventListener("userUpdate", (event) => {
      try {
        const newUser = JSON.parse(event.data) as User;

        console.log("userUpdate:", newUser);

        if (newUser.role === "LECTURER") return; // skip lecturers

        setData((prev) => {
          const exists = prev.find((u) => u.id === newUser.id);
          if (exists) {
            return prev.map((u) => (u.id === newUser.id ? newUser : u));
          }
          return [...prev, newUser];
        });
      } catch (err) {
        console.error("Error parsing userUpdate:", err);
      }
    });

    eventSource.onerror = () => {
      setError("Connection lost. Retrying…");
      eventSource.close();
    };

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      eventSource.close();
    };
  }, [token, baseUrl]);




  if (loading) return <div className="h-[100vh] flex items-center justify-center text-center p-4 text-muted-foreground">
    <BlinkBlur color={["#ffffff", "#d3d3d3", "#808080", "#000000"]} />
  </div>
  if (error) return <div className="text-center p-4 text-destructive">{error}</div>


  return (
    <div>
      <header className="flex h-16 shrink-0 items-center justify-between pr-4 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Admins</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Mood />
      </header>
      <main className="px-4">
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </div>
  )
}

export default Admins