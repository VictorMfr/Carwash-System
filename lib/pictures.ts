// Guardar imagen en la carpeta uploads
import path from "path";
import { promises as fs } from "fs";

// Obtener la carpeta uploads
const getUploadsDir = (subDir: string) => {
    const root = process.cwd();
    return path.join(root, "uploads", subDir);
}

// Determinar la extensión del archivo
const determineExtension = (file: File) => {
    const originalName = file.name || "";
    const existingExt = path.extname(originalName);
    if (existingExt) return existingExt.toLowerCase();
    const type = (file as any).type as string | undefined;
    if (!type) return ".bin";
    if (type.includes("jpeg")) return ".jpg";
    if (type.includes("png")) return ".png";
    if (type.includes("webp")) return ".webp";
    if (type.includes("gif")) return ".gif";
    return ".bin";
}

// Guardar imagen en la carpeta uploads
export const storePicture = async (picture: File, subDir: string, name?: string) => {
    const dir = getUploadsDir(subDir);
    await fs.mkdir(dir, { recursive: true });

    const ext = determineExtension(picture);
    // Si se proporciona un nombre, asegurarse de que solo se use el nombre base del archivo (evitar pasar una ruta pública)
    const baseName = name ? path.basename(name) : undefined;
    const uniqueName = baseName || `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filePath = path.join(dir, uniqueName);

    const arrayBuffer = await picture.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/uploads/${subDir}/${uniqueName}`;
    return publicPath;
}

// Leer archivo de uploads
export const readUploadFile = async (subDir: string, fileName: string) => {
    const filePath = path.join(process.cwd(), "uploads", subDir, fileName);
    const file = await fs.readFile(filePath);
    return file;
}

// Eliminar archivo de uploads
export const deleteUploadFile = async (fileName: string) => {
    try {
        if (!fileName) return;
        // Normalizar el valor de entrada que puede ser una ruta pública como "/uploads/sub/file.png"
        let normalized = fileName.replace(/\\/g, '/');
        // Eliminar los slashes iniciales
        normalized = normalized.replace(/^\/+/, '');
        // Asegurar que la ruta comience con uploads/
        const uploadsIndex = normalized.indexOf('uploads/');
        if (uploadsIndex > 0) normalized = normalized.slice(uploadsIndex);
        const filePath = path.join(process.cwd(), normalized);
        await fs.unlink(filePath);
    } catch (e) {
        // Silenciosamente ignorar si el archivo no existe
    }
}

// Validar imagen
export const isValidPicture = (picture: FormDataEntryValue | null) => {
    try {
        const pictureIsNotEmpty = !!picture;
        const pictureIsAFile = picture instanceof File;
        const pictureIsAString = typeof picture === 'string';
        const pictureHasOnlyOneFile = (picture as File).size > 0;

        const validation = (
            pictureIsNotEmpty &&
            pictureIsAFile &&
            pictureHasOnlyOneFile &&
            !pictureIsAString
        );

        return validation;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Procesar entrada de imagen del servidor
export const storeAndGetPicturePath = async (picture: FormDataEntryValue | null, subDir: string) => {
    try {
        // Validar imagen
        if (!isValidPicture(picture)) return null;

        // Obtener la ruta de la imagen
        const picturePath = await storePicture(picture as File, subDir);
        return picturePath;
    } catch (error) {
        console.log(error);
        return null;
    }
}
