import fs from "fs";
import path from "path";

// Chequea si un archivo existe dentro de /public (server-side only).
// Permite usar la imagen real apenas se sube, y mostrar un placeholder mientras tanto.
export function publicFileExists(publicPath) {
  if (!publicPath) return false;
  const filePath = path.join(process.cwd(), "public", publicPath);
  return fs.existsSync(filePath);
}
