import sharp from "sharp";
import { readdirSync, unlinkSync } from "fs";

const dir = "public/images";
for (const f of readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
  const name = f.replace(".jpg", "");
  await sharp(`${dir}/${f}`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${dir}/${name}.webp`);
  unlinkSync(`${dir}/${f}`);
  console.log(`OK ${name}.webp`);
}
