// One-off: converts the old site's heavy images to WebP in public/img.
import sharp from "sharp";
import fs from "node:fs";

const SRC = "C:/Projects/utkarshpophli.github.io/";
const OUT = "public/img/";
const jobs = [
  ["profile_pic.jpeg", "profile", 2000],
  ["1.jpg", "casual", 1000],
  ["36101328819.png", "formal", 1000],
  ["virtual_try_on.png", "tryon", 1400],
  ["llama_maths.jpg", "llama", 1200],
  ["Bhagvad-Gita-LLM.png", "gita", 1200],
  ["gemma_finetune.jpg", "gemma", 800],
  ["mlp_model.png", "mlp", 1200],
  ["ml_algo.png", "mlalgo", 800],
  ["NTPC.jpg", "ntpc-art", 1400],
  ["NTPC1.jpg", "ntpc-site", 1400],
  ["NTPC2.jpg", "ntpc-plant", 1400],
  ["iiitm.jpeg", "iiitm", 1200],
  ["iiitm1.png", "iiitm-fig1", 1200],
  ["e-cell.png", "ecell", 1400],
  ["wybble2.png", "wybble-pose", 1200],
  ["wybble1.jpeg", "wybble-seg", 1200],
  ["wybbleai.jpg", "wybble-desk", 1400],
  ["siemens.png", "siemens", 800],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [file, name, width] of jobs) {
  const info = await sharp(SRC + file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`${OUT}${name}.webp`);
  console.log(name.padEnd(12), info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
}
