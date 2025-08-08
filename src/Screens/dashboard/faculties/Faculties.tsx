import Mood from "@/components/Mood"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DataTable } from "./data-table"
import { columns, type Faculty } from "./columns"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import React from "react"
import axios from "axios"
import { BlinkBlur } from "react-loading-indicators"


const Faculties = () => {

  const { token } = useSelector((state: RootState) => state.auth)
  const baseUrl = import.meta.env.VITE_BASE_URI;

  const [data, setData] = React.useState<Faculty[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/faculties`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(res);
        
        setData(res.data);
        setError(null);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to fetch users.");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchUsers();
  }, [token]);


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
                <BreadcrumbPage>Faculties</BreadcrumbPage>
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

export default Faculties