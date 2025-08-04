# 🐳 batch-build-mini-program

一个用于**批量构建 / 上传**多个微信小程序的 Node.js 脚本工具。
支持自动修改 `manifest.json` 和项目内配置文件，可灵活配置不同 `appid`、`host` 和 `privateKey`，适合多项目统一打包场景。

---

## ✨ 特性

- 多小程序项目统一批量打包上传
- 动态修改 `appid` 与业务 host
- 每个小程序可配置不同私钥
- 使用 Node.js 脚本结合 HBuilderX CLI
- 简单 JSON 配置即可添加新项目

---

## 📦 安装

```bash
git clone https://github.com/yourname/batch-build-mini-program.git
cd batch-build-mini-program
npm install
```

---

## ⚙️ 配置

编辑根目录下的 `config.json`：

```
{
  "projectPath": "/absolute/path/to/your/uniapp/project",
  "cliPath": "/Applications/HBuilderX.app/Contents/MacOS/cli",
  "hostConfigPath": "/absolute/path/to/your/project/appConfig.js",
  "version": "2.90.3",
  "description": "text upload",
  "apps": [
    {
      "appid": "",
      "host": "",
      "privateKeyPath": ""
    }
  ]
}

```

配置项说明

| 字段             | 说明                                                        |
| ---------------- | ----------------------------------------------------------- |
| `projectPath`    | 小程序项目根目录，需为绝对路径                              |
| `cliPath`        | HBuilderX 自带 CLI 路径（MacOS/Linux/Windows 路径不同）     |
| `hostConfigPath` | 项目内配置文件（如 API host）的路径                         |
| `version`        | 上传版本号                                                  |
| `description`    | 上传描述信息                                                |
| `apps`           | 多个小程序配置，每个包含 `appid`、`host`和 `privateKeyPath` |

---

## 🚀 使用

执行打包上传：

`node ./main.js`

---

## 📌 注意事项

✅ 请确认：

- 已安装并配置好 HBuilderX；
- `cliPath` 为正确的 CLI 路径；
- `privateKeyPath` 为对应小程序申请的私钥；
- `hostConfigPath` 中应有 `host: 'xxx'` 这种格式，否则替换会失败。

⚠️ 本脚本会直接修改：

- `manifest.json` → 更新 `appid`
- `hostConfigPath` 文件 → 更新 `host`
- `hostConfigPath` 为自定义逻辑 如无需要请自行删除，为分发小程序调用不同的接口而写的逻辑

请在提交代码前自行检查或做版本管理备份。
