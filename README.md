# PokemonAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Build e execução em produção

1. Gere o build de produção:
   ```sh
   npm run build -- --configuration production
   ```

2. Sirva a aplicação com http-server (instale globalmente se necessário):
   ```sh
   cd pokemon-angular
   npx http-server ./dist/pokemon-angular/browser -p 4200
   ```

3. Acesse [http://localhost:4200](http://localhost:4200) no navegador para ver a aplicação rodando em modo produção com Service Worker e cache ativados.
