import { useHeaderContext } from "../context";

export default function useTitlesController() {
    
    const { settings } = useHeaderContext();
    
    return {
        title: settings.title,
        subtitle: settings.subtitle,
        icon: settings.icon,
    }
}