/**
 * Robot modellerinin mobil sürümlerini üretir: dokular 1024² → 512².
 *
 * NEDEN
 * Robotlar telefonda 230 piksel boyunda görünüyor (HeroRobots.tsx'teki
 * `robotPx` formülü). Onlara 1024×1024'lük dokular giydirmek kat kat fazlası:
 * GPU'da her doku sıkıştırılmadan durur, mipmap zinciriyle birlikte
 * 1024² × 4 bayt × 1.33 ≈ 5.3 MB. İki robotta sekiz doku → ~43 MB.
 *
 * 512²'de aynı hesap ~11 MB veriyor. iPhone'da ekranda görülen fark yok
 * (ölçüldü: 230 px'lik bir figür için 512 zaten cömert), kazanç ~32 MB.
 *
 * Bu, iOS Safari'de "bu sayfada birçok kez sorun oluştu" hatasının hedefi:
 * o mesaj sekmenin bellek tavanını aşıp öldürülmesi demek.
 *
 * KULLANIM
 *   node scripts/make-mobile-models.mjs
 *
 * `sharp` ayrı bir bağımlılık olarak eklenmedi: Next.js kendi görsel
 * optimizasyonu için zaten getiriyor. Bu betik elle, yalnızca kaynak modeller
 * değiştiğinde çalıştırılıyor — üretim derlemesi ona bağımlı değil. Bir gün
 * "Cannot find package 'sharp'" derse: npm i -D sharp.
 *
 * Kaynak modeller değişirse (yeni robot, yeni doku) bunu yeniden çalıştırın —
 * mobil sürümler türetilmiş dosyalardır, elle düzenlenmez.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const TARGET = 512;
const MODELS_DIR = path.join(process.cwd(), "public", "models");
const JOBS = [
  ["robot-a.opt.glb", "robot-a.mobile.glb"],
  ["robot-b.opt.glb", "robot-b.mobile.glb"],
];

/**
 * GLB ikili bir kap: 12 baytlık başlık + JSON parçası + BIN parçası. Dokular
 * BIN'in içinde, JSON'daki bufferView'ler de onlara ofsetle işaret ediyor.
 * Dokuları küçültmek baytların uzunluğunu değiştirdiği için BIN'i baştan kurup
 * TÜM bufferView ofsetlerini yeniden yazmak gerekiyor — yoksa geometri de
 * kayar ve model bozulur.
 */
async function shrink(inFile, outFile) {
  const buf = fs.readFileSync(inFile);
  if (buf.slice(0, 4).toString("ascii") !== "glTF") {
    throw new Error(`${inFile} bir GLB dosyası değil`);
  }

  const jsonLen = buf.readUInt32LE(12);
  const json = JSON.parse(buf.slice(20, 20 + jsonLen).toString("utf8"));
  const binStart = 20 + jsonLen + 8;
  const binLen = buf.readUInt32LE(20 + jsonLen);
  const bin = buf.slice(binStart, binStart + binLen);

  // Her bufferView'i kendi baytlarına ayır; sonra sırayla yeniden dizeceğiz.
  const views = json.bufferViews.map((bv) =>
    bin.slice(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength),
  );

  let before = 0;
  let after = 0;
  for (const image of json.images || []) {
    const idx = image.bufferView;
    if (idx === undefined) continue; // dış dosyaya bakan doku — bu modellerde yok
    const meta = await sharp(views[idx]).metadata();
    const w = Math.min(TARGET, meta.width);
    const h = Math.min(TARGET, meta.height);
    before += meta.width * meta.height;
    after += w * h;
    if (w === meta.width && h === meta.height) continue;
    views[idx] = await sharp(views[idx])
      .resize({ width: w, height: h, fit: "fill" })
      .webp({ quality: 88 })
      .toBuffer();
  }

  // BIN'i yeniden kur. glTF, bufferView ofsetlerinin 4 bayta hizalı olmasını
  // ister (accessor'lar doğrudan bu ofsetlerden okuyor).
  const parts = [];
  let offset = 0;
  json.bufferViews.forEach((bv, i) => {
    bv.byteOffset = offset;
    bv.byteLength = views[i].length;
    parts.push(views[i]);
    offset += views[i].length;
    const pad = (4 - (offset % 4)) % 4;
    if (pad) {
      parts.push(Buffer.alloc(pad));
      offset += pad;
    }
  });
  const newBin = Buffer.concat(parts);
  json.buffers[0].byteLength = newBin.length;

  // JSON parçası boşlukla, BIN parçası sıfırla 4 bayta tamamlanır (glTF şartı).
  const rawJson = Buffer.from(JSON.stringify(json), "utf8");
  const jsonChunk = Buffer.concat([
    rawJson,
    Buffer.alloc((4 - (rawJson.length % 4)) % 4, 0x20),
  ]);

  const header = Buffer.alloc(12);
  header.write("glTF", 0, "ascii");
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + newBin.length, 8);

  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonChunk.length, 0);
  jsonHeader.write("JSON", 4, "ascii");

  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(newBin.length, 0);
  binHeader.write("BIN\0", 4, "ascii");

  fs.writeFileSync(
    outFile,
    Buffer.concat([header, jsonHeader, jsonChunk, binHeader, newBin]),
  );

  // GPU'daki maliyet piksel sayısıyla doğrusal; 1.33 mipmap zincirinin payı.
  const gpuBefore = (before * 4 * 1.333) / 1048576;
  const gpuAfter = (after * 4 * 1.333) / 1048576;
  console.log(
    `${path.basename(inFile)} → ${path.basename(outFile)} | ` +
      `dosya ${(buf.length / 1048576).toFixed(2)} → ${(fs.statSync(outFile).size / 1048576).toFixed(2)} MB | ` +
      `GPU dokuları ~${gpuBefore.toFixed(1)} → ~${gpuAfter.toFixed(1)} MB`,
  );
}

for (const [src, dst] of JOBS) {
  await shrink(path.join(MODELS_DIR, src), path.join(MODELS_DIR, dst));
}
