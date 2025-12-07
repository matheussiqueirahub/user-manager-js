# Gerenciador de Usuários com Persistência Local

Este projeto consiste em uma implementação de uma Single Page Application (SPA) para gerenciamento de usuários, desenvolvida com foco em JavaScript Vanilla moderno, persistência de dados no cliente e práticas de Programação Orientada a Objetos (POO).

O objetivo principal é demonstrar competências na manipulação do DOM, validação de dados, estruturação de código modular e uso da Web Storage API para persistência de estado entre sessões.

## Visão Geral

A aplicação permite realizar as operações fundamentais de CRUD (Create, Read, Update, Delete) sobre uma entidade de usuário. Os dados são persistidos no LocalStorage do navegador, garantindo que as informações sejam mantidas mesmo após o recarregamento da página ou fechamento do navegador.

A interface foi construída utilizando CSS moderno, focando em responsividade e usabilidade, sem a dependência de frameworks externos de estilização.

## Funcionalidades

*   **Cadastro de Usuários**: Permite a criação de novos registros com validação de formato de e-mail via Expressões Regulares (Regex).
*   **Listagem de Dados**: Exibição dinâmica dos usuários cadastrados com atualização em tempo real.
*   **Edição de Registros**: Capacidade de alterar dados de usuários existentes.
*   **Remoção de Usuários**: Exclusão de registros do estado da aplicação e do armazenamento local.
*   **Persistência de Dados**: Sincronização automática do estado da aplicação com o LocalStorage.
*   **Feedback Visual**: Sistema de notificações (Toasts) para informar o usuário sobre o sucesso ou falha das operações.

## Tecnologias Utilizadas

*   **JavaScript (ES6+)**: Utilização de Classes para encapsulamento da lógica de negócios (`UserManager`), Arrow Functions, Template Literals e manipulação de Arrays.
*   **HTML5**: Estrutura semântica.
*   **CSS3**: Uso de CSS Variables, Flexbox, Grid Layout e Media Queries para design responsivo.
*   **LocalStorage API**: Para armazenamento de dados chave-valor no navegador.

## Estrutura do Projeto

A arquitetura do projeto segue uma separação de responsabilidades claras:

*   `index.html`: Ponto de entrada da aplicação e estrutura de layout.
*   `style.css`: Definições de estilo, temas e regras de responsividade.
*   `UserManager.js`: Camada de Modelo/Serviço. Contém a classe responsável pela lógica de negócios, validação de dados e comunicação direta com o LocalStorage. Não possui dependências diretas da interface (DOM).
*   `app.js`: Camada de Controlador/View. Responsável por instanciar o gerenciador, manipular o DOM, capturar eventos do usuário e atualizar a interface gráfica.

## Instalação e Execução

Não é necessário nenhum ambiente de servidor ou processo de build (como Webpack ou Node.js) para executar este projeto, pois ele utiliza tecnologias nativas do navegador.

1.  Clone o repositório:
    ```bash
    git clone https://github.com/matheussiqueirahub/user-manager-js.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd user-manager-js
    ```

3.  Abra o arquivo `index.html` em qualquer navegador web moderno.

## Decisões de Implementação

*   **Validação**: A validação de e-mail é realizada no método `createUser` e `updateUser` para garantir a integridade dos dados antes da persistência.
*   **Tratamento de Erros**: O uso de blocos `try-catch` no controlador permite capturar exceções lançadas pela lógica de negócios e convertê-las em feedback visual amigável para o usuário.
*   **Modularidade**: A lógica de gerenciamento de usuários foi isolada em uma classe própria, facilitando testes e manutenção futura.
