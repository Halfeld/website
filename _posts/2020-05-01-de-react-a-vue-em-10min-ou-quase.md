---
layout: post
title: "De React a Vue em 10min (ou quase 10min)"
desc: "Aprendendo a migrar sem dores"
lang: "Portuguese"
date: 2020-05-01T00:00:00.000Z
image: react-vue.png
---

Fala pessoas! Quero responder aqui nesse artigo uma pergunta que me fazem com bastante frequência: Quais os principais pontos importantes para saberem em uma migração do React.js para o Vue.js?

Esse artigo aqui é um resumo desse vídeo que eu fiz para o meu canal no youtube

<iframe src="https://www.youtube-nocookie.com/embed/t-4rhwSQ8mo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Bom, a intenção desse conteúdo aqui é ajudar quem está migrando de uma lib para a outra, seja por conta de uma mudança de empresa, troca de projeto, etc. O objetivo não é falar qual é melhor ou pior, mas sim apresentar minhas visões baseadas nas minhas experiências dado que já passei por diversos frameworks front-end, Knockout.js, Angular 1, JQuery, Backbone, entre outros, até Angular 2x e atualmente React.js e Vue.js. 


## Bora ver os principais pontos:

**Semelhanças:**

- Ambas utilizam o Virtual DOM na sua forma de fazer as coisas por baixo dos panos o que contribui para você extrair melhor desempenho, sem precisar atualizar o DOM de forma desnecessária, por exemplo.

- Ambas são consideradas libraries utilizadas para construir a parte view. Elas não vão controlar roteamento, fluxo de dados, etc. Todo esse restante você define como fará.


**Diferenças:**

1. Single File Component

Vue.js possui um conceito de Single File Component, onde você possui arquivos com a extensão .vue, em que basicamente você consegue separar o CSS, JS e HTML por tags no mesmo arquivo ao invés de estar tudo misturado. As tags possíveis são: Template (onde fica o HTML), Script (onde fica o JavaScript) e Style (onde fica o CSS). Tudo isso é muito customizável, por exemplo, nas tags é possível adicionar um atributo de source e apontar para um arquivo:

```html
<template src=”index.html”></template>
<script src=”script.js"></script>
<style src=”style.css”></style>
```

No React você consegue fazer tudo em um único componente também, porém você não tem tanta liberdade assim e não existe a separação de blocos como no arquivos .vue

2. DataBinding

O Vue.js implementa o DataBinding utilizando o Observer Pattern atrelando a API do próprio Ecma denominada Object.defineProperty(). Essa API nos permite, por exemplo, modificar o getter e o setter de algum objeto e ao settar o Vue chamo o notify do Observer Pattern para atingir o objetivo que queremos. Isso torna o DataBinding mais poderoso e performático ao invés de ficar fazendo dirty-checking e verificando se algo mudou.

3. Simplicidade

Esse é o aspecto mais saliente do Vue.js. Foi, sem dúvida, o que fez com que essa solução evoluísse de um framework open source por nenhuma empresa por trás até o que temos hoje, uma comunidade gigantesca com várias conferências e meetups ao redor do mundo além de várias empresas adotando.

4. Ecossistema

No React, é bem utilizado o Redux para controlar os estados. Já no Vue.js nós temos o Vuex, uma solução parecida na intenção com a mencionada anteriormente, mas que se difere na forma de utilizar. É uma implementação da arquitetura de Elm, uma outra forma de fazer front-end. Assim conseguimos manipular estado global, mas de uma maneira bem mais simples.

5. Router

Para lidar com roteamento, o Vue.js apesar de ser focado na view, possui uma alternativa denominada Vue Router. 

6. Testes

No caso do React a galera costuma usar o React Enzyme, no Vue.js temos um paralelo que é o VueTestUtils, que são bem equivalentes.

7. Server Side Rendering

No React o Next.js é bem utilizado. O paralelo no Vue é o Nuxt.js que foi inspirado no mencionado anteriormente. Apesar da inspiração, em uma opinião bem pessoal, creio que esse último possui uma maturidade maior e uma maior quantidade de features. De qualquer forma, recomendo que você teste os dois e tire suas próprias conclusões.

8. Estado global

No React, vejo bastante gente utilizando o Styled Components. Eu particularmente até uso para isolamento de estados, quando não contorno com CSS Modules, mas utilizo mesmo no React Native por me dar uma sintaxe mais equivalente ao CSS. No Vue.js, além das opções mencionadas anteriormente, temos a opção de utilizar o atributo scoped na tag style, fazendo com que o CSS seja apenas daquele componente, resolvendo o problema de estado global de forma mais simples.

9. CLI

No React temos o Create React App, porém a do Vue é mais on steroids (robusta) em relação a feature. Além dele criar os arquivos pra você, ele pergunta o que você quer e apenas ao responder você já tem um scaffold de código com tudo setado pra você.

10. Game Changer

No Vue.js, é possível criar um front-end tanto pelo Terminal quanto pela interface gráfica em que você pode também por ali gerenciar o seu projeto. Digitando no seu terminal vue ui, aí ao abrir a interface você pode abrir um projeto já existente, criar um projeto do zero, pesquisar novos plugins, etc. É bem poderoso e didático!

11. DevTools

O Vue possui uma extensão do Chrome denominada VueDevTools para debugging, onde você consegue ver estrutura de componentes, eventos emitidos, seu estado global, profiling para ver como está performando.

12. Escala

É possível modularizar a escala no Vue, o que digo com isso, é que você consegue flexionar o Vue para projetos muito pequenos até aplicações empresariais.


Como você pode perceber, no caso do Vue você pode, assim como no React, escolher utilizar a lib focada na View e pronto. Mas no caso do Vue você tem um ecossistema de soluções que são mantidas pelo mesmo core team para caso você queira utilizar. Caso você opte por utilizar, posso afirmar que o Vue.js passa a ser o que chamam de Framework Progressivo, que cresce à medida que você precisa.


Considerações finais

Espero que esse conteúdo tenha contribuído com seus estudos e que você continue estudando, testando, experimentando as soluções para entender aquilo que faz mais sentido para a sua realidade atual. Se curtiu, deixa seu like e se pensou em mais alguma diferença ou semelhança que não mencionei, deixa nos comentários!

Valeu e até a próxima!

https://twitter.com/igorhalfeld
