import Mood from '@/components/Mood'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { RootState } from '@/store/store'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'


const Overview = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const { token } = useSelector((state: RootState) => state.auth);
    const baseUrl = import.meta.env.VITE_BASE_URI;

    React.useEffect(() => {
        const fetchVisitors = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`${baseUrl}/api/visitors`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(res.data);
            } catch (err: any) {
                console.error("Error fetching visitors:", err);
                setError(err.response?.data?.error || "Failed to fetch visitors");
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();

        const interval = setInterval(fetchVisitors, Math.floor(5*60*1000));
        return () => clearInterval(interval);
    }, [baseUrl, token]);

    if (loading) return <p>Loading visitors...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


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
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Mood />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                <div className='flex gap-4 '>
                    <div className="bg-muted/50 h-full p-6 rounded-2xl w-3/4 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">📅 Daily Visitors</h2>

                        <Accordion type="single" collapsible className="space-y-2">
                            {data.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`visitor-${index}`}
                                    className="border rounded-xl bg-background shadow-sm"
                                >
                                    <AccordionTrigger className="flex justify-between items-center px-4 py-2 text-sm font-medium hover:bg-muted/70 rounded-t-xl">
                                        <div className="flex flex-col text-left">
                                            <span className="font-semibold">{item.firstname} {item.lastname}</span>
                                            <span className="text-xs text-muted-foreground">{item.matno}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 py-3 bg-muted/30 rounded-b-xl">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                            <div>
                                                <span className="text-muted-foreground text-xs">Firstname</span>
                                                <p className="font-medium">{item.firstname}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground text-xs">Lastname</span>
                                                <p className="font-medium">{item.lastname}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground text-xs">Matric No</span>
                                                <p className="font-medium">{item.matno}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground text-xs">Faculty</span>
                                                <p className="font-medium">{item.faculty}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground text-xs">Department</span>
                                                <p className="font-medium">{item.department}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground text-xs">Date</span>
                                                <p className="font-medium">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="bg-muted/50 h-full p-4 rounded-xl w-1/4" >
                        <h2>Active</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview