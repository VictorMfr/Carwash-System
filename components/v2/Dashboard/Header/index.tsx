import { header } from "@/types/v2/dashboard/header/header";
import { HeaderProvider } from "./context";
import Header from "./Header";

export default function HeaderIndex({ settings }: { settings: header }) {
    return (
        <HeaderProvider settings={settings}>
            <Header />
        </HeaderProvider>
    )
}