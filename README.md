# PokemonAngular

Este projeto é uma Single Page Application (SPA) desenvolvida em Angular 18+, consumindo a PokéAPI, com funcionalidades de PWA, cache offline, favoritos e sincronização automática.

## Pré-requisitos

- Node.js 18+
- npm 9+
- Angular CLI (opcional, para desenvolvimento)
- [serve](https://www.npmjs.com/package/serve) (para servir a aplicação em produção)

## Instalação

1. Instale as dependências:
   ```sh
   npm install
   ```

## Desenvolvimento

Para rodar o servidor de desenvolvimento com hot reload:
```sh
npm start
```
Acesse [http://localhost:4200](http://localhost:4200) no navegador.

## Build de Produção

Para gerar o build de produção:
```sh
npm run build -- --configuration production
```
Os arquivos finais serão gerados em:
```
pokemon-angular/dist/pokemon-angular/browser/
```

## Servindo a aplicação em produção

O build Angular é gerado na pasta `dist/pokemon-angular/browser`. Para servir os arquivos estáticos em produção, rode:

```sh
npx serve ./dist/pokemon-angular/browser
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador (ou a porta informada pelo comando).

## Estrutura do Projeto

- `src/` — Código-fonte principal
- `dist/pokemon-angular/browser/` — Build de produção
- `ngsw-config.json` — Configuração do Service Worker (PWA)
- `public/` — Assets públicos

## Funcionalidades

- Listagem paginada e busca de pokémons
- Favoritos persistidos em localStorage
- PWA com cache offline e fallback
- Sincronização automática ao voltar online
- UX responsiva e acessível

## Observações

- Para deploy em servidores reais (Firebase, Vercel, Netlify, etc.), configure o fallback de SPA conforme a plataforma.
- Para dúvidas sobre arquitetura, PWA, RxJS ou outros detalhes, consulte a documentação interna ou abra uma issue.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
