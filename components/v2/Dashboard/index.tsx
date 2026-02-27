import { DashboardProvider } from "./context";
import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import dashboard from "@/types/v2/dashboard/dashboard";
import Dashboard from "./Dashboard";

const DashboardIndex = ({ 
    children, 
    settings 
}: { 
    children: React.ReactNode, 
    settings: dashboard 
}) => {
    return (
        <DashboardProvider settings={settings}>
            <Dashboard>
                {children}
            </Dashboard>
        </DashboardProvider>
    );
}

export default withUIDisplayControls(DashboardIndex);