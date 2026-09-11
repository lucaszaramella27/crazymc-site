# Crazy MC

Portal oficial da Crazy MC construído com React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

No PowerShell, use `npm.cmd` caso a execução de `npm.ps1` esteja bloqueada:

```powershell
npm.cmd install
npm.cmd run dev
```

O servidor local utiliza a porta `5173` e falha imediatamente se ela já estiver ocupada.

## Configuração pública

O Vite incorpora variáveis iniciadas por `VITE_` no JavaScript entregue ao navegador. Nunca coloque senhas, tokens privados ou chaves secretas nessas variáveis.

Variáveis utilizadas:

```dotenv
VITE_MINECRAFT_SERVER_ADDRESS=crazymc.bed.net.br
VITE_MINECRAFT_EDITION=java
VITE_DISCORD_URL=https://discord.gg/crazymc
VITE_SITE_URL=
```

`VITE_SITE_URL` deve receber o domínio final somente no ambiente da hospedagem. Ele é opcional durante o desenvolvimento e ativa URLs canônicas nas páginas.

## Validação e build

```powershell
npm.cmd run typecheck
npm.cmd run check
```

O build final é criado em `dist/`. Para conferir esse build localmente:

```powershell
npm.cmd run preview
```

`vite preview` serve apenas para revisão local e não deve ser usado como servidor de produção.

## Publicação

Publique o conteúdo de `dist/` em um serviço de arquivos estáticos. Como o projeto usa rotas do navegador, a hospedagem precisa redirecionar URLs desconhecidas para `/index.html`.

O repositório já inclui:

- `public/_redirects` para Netlify e Cloudflare Pages;
- `public/_headers` com cache e cabeçalhos básicos de segurança para hosts compatíveis;
- `public/.htaccess` para servidores Apache.

Em outra hospedagem, configure manualmente o mesmo fallback de SPA.
