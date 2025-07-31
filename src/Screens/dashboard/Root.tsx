import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { RootState } from '@/store/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'


const Root = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

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