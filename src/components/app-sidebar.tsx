import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartArea,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutGrid,
  Map,
  MonitorCog,
  PieChart,
  Settings2,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@cooc.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "User Management",
      url: "/dashboard/admins",
      icon: Users,
      items: [
        {
          title: "Admins",
          url: "/dashboard/admins",
        },
        {
          title: "Lecturers",
          url: "/dashboard/lecturers",
        },
      ],
    },
    {
      title: "Report & Analysis",
      url: "/dashboard/analysis",
      icon: PieChart,
      items: [
        {
          title: "Analysis",
          url: "/dashboard/analysis",
        },
        {
          title: "Report",
          url: "/dashboard/report",
        },
      ],
    },
    {
      title: "Config",
      url: "#",
      icon: MonitorCog,
      items: [
        {
          title: "Appraisal",
          url: "/dashboard/appraisal",
        },
        {
          title: "Faculties",
          url: "/dashboard/faculties",
        },
        {
          title: "Departments",
          url: "/dashboard/departments",
        },
        {
          title: "Roles",
          url: "/dashboard/roles",
        },
        {
          title: "Previlage",
          url: "/dashboard/previlage",
        },
      ],
    },
  ],

  projects: [
    {
      name: "Overview",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Visitors",
      url: "/dashboard/visitor",
      icon: User,
    },
    {
      name: "Appraisals",
      url: "/dashboard/appraisals",
      icon: ChartArea,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
