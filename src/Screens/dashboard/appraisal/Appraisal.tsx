import React from 'react'
import { DataTable } from './data-table'
import Mood from '@/components/Mood'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { columns } from './columns'
import axios from 'axios'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

const Appraisal = () => {
  const [data, setData] = React.useState([]);
  const { token } = useSelector((state: RootState) => state.auth)
  const baseUrl = import.meta.env.VITE_BASE_URI;

  console.log(token);


  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${baseUrl}/appraisal`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
      setData(res.data);
    }

    fetch();
  }, [])


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
                <BreadcrumbPage>Appraisal</BreadcrumbPage>
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

export default Appraisal