import { AppSidebar } from '@/components/app-sidebar'
import { Toast } from '@/components/Toast';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'


const Root = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        console.log(isAuthenticated);
        
        if (isAuthenticated === false) {
            Toast.fire({
                icon: 'info',
                title: 'Session TimeOut',
            })
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