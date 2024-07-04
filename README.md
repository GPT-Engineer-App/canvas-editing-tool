# canvas-editing-tool

Instruções para Criação de Aplicação Tipo Canva
Objetivo
Desenvolver uma aplicação web de edição de imagens de alto nível, similar ao Canva, utilizando Fabric.js e outras bibliotecas complementares.
Tecnologias Principais

HTML5
CSS3
JavaScript (ES6+)
Fabric.js (versão mais recente)

Funcionalidades Principais
1. Interface do Usuário

Criar um layout responsivo com área de trabalho (canvas) centralizada
Implementar uma barra de ferramentas com ícones para cada funcionalidade
Adicionar um painel lateral para opções avançadas e camadas

2. Manipulação de Imagens
2.1 Seleção e Movimentação

Implementar seleção de objeto ao clicar e segurar o botão do mouse
Permitir arrastar o objeto selecionado enquanto o botão do mouse estiver pressionado
Exibir borda de seleção apenas durante o arraste
Manter a nova posição do objeto ao soltar o botão do mouse

2.2 Redimensionamento

Adicionar controles de redimensionamento (quadrados) nos cantos e bordas do objeto selecionado
Implementar redimensionamento proporcional ao arrastar os controles dos cantos
Atualizar o objeto em tempo real durante o redimensionamento

2.3 Rotação

Adicionar um ponto de rotação (círculo pequeno) acima do objeto selecionado
Implementar rotação suave e fluida ao arrastar o ponto de rotação

2.4 Exclusão

Permitir a exclusão do objeto selecionado ao pressionar a tecla "Delete"

3. Ferramentas Avançadas
3.1 Camadas

Implementar um sistema de camadas para organizar objetos
Permitir reordenar, ocultar e bloquear camadas

3.2 Filtros e Efeitos

Adicionar filtros de imagem (brilho, contraste, saturação, etc.)
Implementar efeitos (sombra, borda, etc.)

3.3 Texto

Permitir adicionar e editar texto no canvas
Implementar opções de formatação (fonte, tamanho, cor, alinhamento)

3.4 Formas Geométricas

Adicionar ferramentas para criar formas básicas (retângulo, círculo, linha)
Permitir personalização de cor de preenchimento e contorno

3.5 Recorte de Imagem

Implementar ferramenta de recorte com preview em tempo real

4. Integração e Exportação
4.1 Importação de Imagens

Permitir upload de imagens do dispositivo do usuário
Implementar busca e inserção de imagens de banco de imagens gratuitas (ex: Unsplash API)

4.2 Exportação do Projeto

Adicionar opção para exportar o projeto em diferentes formatos (PNG, JPEG, SVG)
Implementar ajuste de qualidade e tamanho na exportação

5. Recursos Adicionais
5.1 Histórico de Ações

Implementar funcionalidades de desfazer/refazer

5.2 Alinhamento e Distribuição

Adicionar ferramentas para alinhar e distribuir objetos no canvas

5.3 Modelos e Layouts Pré-definidos

Criar uma seleção de modelos editáveis para diferentes propósitos (posts de redes sociais, apresentações, etc.)

Instruções de Implementação

Configure o ambiente de desenvolvimento com as dependências necessárias.
Crie a estrutura básica HTML com o elemento canvas e a interface do usuário.
Inicialize o Fabric.js canvas e configure as opções básicas.
Implemente cada funcionalidade progressivamente, começando pelas operações básicas de manipulação de objetos.
Adicione as ferramentas avançadas e recursos adicionais.
Teste extensivamente cada funcionalidade e otimize o desempenho.
Documente o código e crie um guia de uso para o usuário final.

Bibliotecas e Recursos Adicionais Sugeridos

fabric-history.js para gerenciamento de histórico
tui-image-editor para funcionalidades avançadas de edição de imagem
Unsplash API para integração de banco de imagens
FileSaver.js para facilitar a exportação de arquivos

Lembre-se de manter o foco na usabilidade e na experiência do usuário, garantindo que a interface seja intuitiva e responsiva.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React with shadcn-ui and Tailwind CSS.

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/canvas-editing-tool.git
cd canvas-editing-tool
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
