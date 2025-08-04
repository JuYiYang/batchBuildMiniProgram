import fs from "fs";
import path from "path";
import stripJsonComments from "strip-json-comments";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import configJson from "./config.json" assert { type: "json" };

const { apps, cliPath, hostConfigPath, projectPath, version, description } =
  configJson;

const manifestPath = path.join(projectPath, "manifest.json");

(async () => {
  for (const item of apps) {
    console.log(`=== 开始打包：appid=${item.appid} ===`);
    const raw = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(stripJsonComments(raw));
    manifest["mp-weixin"]["appid"] = item.appid;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

    // 更新 host 配置
    let configContent = fs.readFileSync(hostConfigPath, "utf-8");
    configContent = configContent.replace(
      /host:\s*['"].*?['"]/,
      `host: '${item.host}'`
    );
    fs.writeFileSync(hostConfigPath, configContent, "utf-8");

    try {
      const cliBack = execFileSync(
        cliPath,
        [
          "publish",
          "--platform",
          "mp-weixin",
          "--upload",
          "true",
          "--appid",
          item.appid,
          "--description",
          description,
          "--version",
          version,
          "--privatekey",
          item.privateKeyPath,
          "--project",
          projectPath,
        ],
        { encoding: "utf-8" }
      );
      console.log(`${item.appid} - ${cliBack.toString()}`);
    } catch (err) {
      console.error(`打包失败：appid=${item.appid}`);
      console.error(err.stderr?.toString() || err.message);
      continue;
    }
  }
})();
