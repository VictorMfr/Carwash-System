import { Role } from "@/services/backend/models/associations";
import getModels from "@/lib/apiUtils/model/getModels";


// Obtener roles
export async function GET() {
    return await getModels(Role);
}