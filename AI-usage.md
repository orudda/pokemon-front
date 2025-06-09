# Relatório de Uso de IA para Geração do Projeto Angular

## Comandos, Prompts e Etapas Realizadas

1. **Verificação da versão do Node.js:**
   - **Prompt:**
     > rode o comando node --version
   - **Comando executado:**
     ```sh
     node --version
     # Saída: v24.0.2
     ```

2. **Criação do projeto Angular 18:**
   - **Prompt:**
     > Gere a estrutura base de um projeto Angular 18 com npm start usando Node.js 24.0.2. Organize o projeto com uma arquitetura modular dividida em: core, shared, features, data, utils e environments. Cada módulo deve ter seu próprio barrel file (index.ts). Configure o projeto com suporte a SCAM (Single Component Angular Modules) e Lazy Loading.
   - **Comando executado:**
     ```sh
     npx -y @angular/cli@18 new pokemon-angular --routing --style=scss --strict --skip-git --no-ssr
     ```
   - **Resolução de problema:**
     - **Prompt:**
       > o comando falhou. vamos criar novamente
     - **Comandos executados:**
       ```sh
       sudo chown -R 501:20 "/Users/othaviorudda/.npm"
       npm cache clean --force
       ```

3. **Organização da arquitetura modular:**
   - **Prompt:**
     > Gere a estrutura base de um projeto Angular 18 com npm start usando Node.js 24.0.2. Organize o projeto com uma arquitetura modular dividida em: core, shared, features, data, utils e environments. Cada módulo deve ter seu próprio barrel file (index.ts). Configure o projeto com suporte a SCAM (Single Component Angular Modules) e Lazy Loading.
   - **Ações realizadas:**
     - Criação das pastas: `core`, `shared`, `features`, `data`, `utils`, `environments`.
     - Criação dos barrel files (`index.ts`) e módulos base para cada pasta.

4. **Instalação e configuração de dependências:**
   - **Prompt:**
     > Instale e configure as seguintes dependências no projeto Angular:
     > @angular/pwa com suporte a cache dinâmico e sincronização online/offline
     > rxjs para manipulação reativa de dados
     > @angular/material com um tema leve e responsivo
     > @ngrx/store (mesmo que eu possa não usar tudo, quero deixar o boilerplate pronto)
   - **Comandos executados:**
     - **rxjs:**
       ```sh
       npm install --prefix pokemon-angular rxjs
       ```
     - **@angular/material:**
       ```sh
       npm install --prefix pokemon-angular @angular/material@18.0.0
       ```
     - **@ngrx/store:**
       ```sh
       npm install --prefix pokemon-angular @ngrx/store@18.0.0
       ```
     - **@angular/pwa:**
       ```sh
       npx --yes ng add @angular/pwa@18
       ```

6. **Geração do relatório de uso:**
   - **Prompt:**
     > gere para mim um arquivo AI-usage.md ao lado da pasta pokemon-angular incluindo um relatorio dos comandos que eu dei para gerar esse projeto
   - **Ação:**
     - Criação deste arquivo com rastreabilidade dos comandos e prompts.

7. **Criação do serviço reativo de Pokémon:**
   - **Prompt:**
     > Crie um PokemonService dentro do módulo data que consome a PokéAPI de forma reativa usando RxJS. O serviço deve expor métodos observáveis para:
     >
     > - Buscar a lista de pokémons paginada e pesquisável
     > - Obter os detalhes de um pokémon
     > - Tratar erros com catchError e expor loading, data e error como streams separadas usando Subjects ou BehaviorSubjects
   - **Ação:**
     - Implementação do serviço `PokemonService` no módulo `data` conforme solicitado, utilizando RxJS, tratamento de erros e exposição de streams reativas para loading, dados e erro.

8. **Criação do componente PokemonListComponent:**
   - **Prompt:**
     > Crie um componente PokemonListComponent no módulo features/pokemon, com template reativo. Ele deve:
     >
     > Assinar os observables do PokemonService
     >
     > Ter um campo de busca que debounced o input com RxJS
     >
     > Ter paginação reativa com switchMap
     >
     > Mostrar loading e error com base nos observables do serviço
   - **Ação:**
     - Implementação do componente `PokemonListComponent` standalone, com template reativo, busca debounced, paginação reativa, integração com o serviço e exibição de loading/erro.

9. **Favoritos: FavoriteService e FavoriteToggleComponent:**
   - **Prompt:**
     > Implemente um FavoriteService no módulo core que armazena e recupera os pokémons favoritos usando localStorage. A lista de favoritos deve ser um observable (favorites$) com operadores RxJS. Crie também um FavoriteToggleComponent reutilizável no shared que se conecta a esse serviço.
     >
     > Adicione o botão de favorito à lista de pokémons.
   - **Ação:**
     - Implementação do serviço `FavoriteService` no core, usando localStorage e RxJS para gerenciar favoritos.
     - Criação do componente standalone `FavoriteToggleComponent` no shared, conectado ao serviço.
     - Integração do botão de favorito à tabela/lista de pokémons.

10. **Configuração do ngsw-config.json para PWA e cache avançado:**
    - **Prompt:**
      > Configure o ngsw-config.json para:
      >
      > Cachear a PokéAPI dinamicamente
      >
      > Cachear assets estáticos e rotas principais
      >
      > Ativar uma estratégia de "Stale-While-Revalidate"

    - **Ação:**
      - O arquivo `ngsw-config.json` foi configurado para:
        - Cache dinâmico da PokéAPI usando dataGroups.
        - Cache de assets estáticos e rotas principais usando assetGroups.
        - Estratégia de "Stale-While-Revalidate" (freshness) para a PokéAPI.
        - Fallback offline configurado para `/offline.html`.
      - Ajustes feitos para garantir compatibilidade de build e funcionamento do Service Worker.

---

**Gerado por IA (ChatGPT) para rastreabilidade e documentação do setup do projeto.** 