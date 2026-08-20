# 在线写作 / 日记编辑 使用指南

`/write` 页面提供文章与日记的在线增删改。后端是 Vercel Serverless Function，用**细粒度 PAT** 代写 GitHub 仓库，浏览器不接触任何 GitHub 凭证。

## 一、一次性配置（部署前做一次）

### 1. 创建 Fine-grained PAT

1. GitHub → Settings → Developer settings → **Personal access tokens** → **Fine-grained tokens** → Generate new token。
2. **Repository access**：选 `Only select repositories`，勾选 `soyorinloves/my-astro-blog`。
3. **Permissions** → Repository permissions → **Contents** 设为 **Read and write**（其余全部 No access）。
4. 生成后复制 `github_pat_...`，**只显示这一次**。

### 2. 生成登录密码 hash

在本地项目目录运行：

```bash
pnpm hash-password "你的登录密码"
```

得到一行 `scrypt$...`，复制。

### 3. 配置 Vercel 环境变量

Vercel 项目 → Settings → Environment Variables，添加：

| 名称 | 值 |
|---|---|
| `GH_PAT` | 第 1 步复制的 token |
| `EDITOR_PASSWORD_HASH` | 第 2 步生成的那行 |
| `SESSION_SECRET` | 一段随机长字符串（`openssl rand -hex 32` 生成） |
| `GITHUB_OWNER` | `soyorinloves` |
| `GITHUB_REPO` | `my-astro-blog` |

部署环境选 Production（和 Preview）。填完 **Redeploy** 一次使变量生效。

## 二、使用

1. 访问 `https://你的域名/write/`，输入登录密码进入。
2. **文章**标签：新建时填标题、slug、正文，点「发布」；编辑已有文章访问 `/write/?slug=文章id`。
3. **日记**标签：直接新增 / 编辑 / 删除。
4. 草稿自动保存在本地浏览器（1.5 秒防抖），刷新不丢。

## 三、写文章说明

- 文章写入 `src/content/posts/<slug>.md`，发布后 push 到 main，Vercel 自动重新构建（约 1 分钟可见）。
- 标签用逗号分隔；日期格式 `YYYY-MM-DD`。
- 正文粘贴图片会自动上传到 `public/images/posts/` 并插入 Markdown 引用。
- 加密文章、permalink、alias 等高级字段在「展开高级字段」里。

## 四、导航图标（留空占位）

导航「Write」入口的图标目前留空，位于 `src/config.ts` 的 `navBarConfig.links` 数组里：

```ts
{
  name: "Write",
  url: "/write/",
  icon: "", // ← 这里填 iconify 图标名，如 "material-symbols:edit"
},
```

找到合适图标后，填进 `icon` 字段（格式参考同文件里的 `material-symbols:book`）即可。

## 五、日常维护

- **PAT 一年过期**：到期后重新生成（重复第一步），更新 Vercel 的 `GH_PAT` 变量即可，其余不变。
- **换登录密码**：重新跑 `pnpm hash-password`，更新 `EDITOR_PASSWORD_HASH`。
- **安全边界**：后端有路径白名单，只允许写 `src/content/posts/**`、`src/data/diary.json`、`public/images/**`，前端即使被攻破也改不了配置和 CI。

## 六、本地开发说明

本地 `pnpm dev` 时后端 `/api/*` 不存在（Vercel 专属），编辑器会显示登录失败/接口报错，属正常。要完整本地联调需 `vercel dev`（需安装 Vercel CLI 并 `vercel login`）。
