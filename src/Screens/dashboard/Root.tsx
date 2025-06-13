import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'


const Root = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Root