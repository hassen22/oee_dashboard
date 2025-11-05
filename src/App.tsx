import Dashboard from "@/pages/Dashboard";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1">
          <Dashboard />
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
