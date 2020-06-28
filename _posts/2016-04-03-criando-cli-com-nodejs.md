---
layout: post
title: "Criando CLI com Node.js"
desc: "Aprendendo a criar uma CLI com NodeJs"
lang: "Portuguese"
date: 2016-04-03T00:00:00.000Z
image: cli-node-js.png
---

Hey galera, como vocês estão? espero que de boas, bora lê um post maroto sobre Node? Demorou!

Ferramentas de linha comando pelo menos para mim são essenciais no desenvolvimento de qualquer projeto, não sei você, mas de tanto usar o terminal eu acho mais fácil encontrar um arquivo por ele do que pelo explorer xD

O que é uma CLI?
================

**CLI** significa _Command Line Interface_, é uma interface que disponibiliza uma serie de comandos para você usar no seu terminal, geralmente são feitos em _Shell Script_, mas vamos fazer em javascript <3

**Para esse post não vou me aprofundar em fazer testes para a CLI, será mais focado no funcionamento mesmo, em um proximo post discutirei TDD e BDD.**


Bora-lá?
========

Vamos criar uma ferramenta que faz uma requisição para uma API e grava um arquivo JSON no diretório atual, bem... é bem simples mas já serve para entender o conceito, ficará assim:

```sh
jget pokeapi.co/api/v1/pokemon/
```

chamaremos essa CLI de `jget` (muito criativo não? :P)

Criando os arquivos
-------------------

Primeiro crie uma pasta com o nome do projeto, entre nela e dê um `npm init` e responda as perguntas, o meu `package.json` ficou assim:

```js
{
  "name": "jget",
  "version": "1.0.0",
  "description": "Simple CLI that made requests for any API",
  "main": "bin/jget",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "preferGlobal": true,
  "bin": {
    "jget": "./bin/jget"
  },
  "keywords": [
    "cli",
    "request",
    "api",
    "nodejs",
    "myworksblog"
  ],
  "author": "Igor Luiz - Halfeld",
  "license": "WTFPL"
}
```

eu só tive adicionar as linhas `preferGlobal`, para quando publicar no NPM ele listar o comando que o modulo deve ser instalado globalmente e o `bin`, para dizer onde esta o executável da nossa CLI. Fiz a mesma coisa no campo `main`.

Agora vamos a árvore de pastas:

```sh
.
├── bin
│   └── jget
├── lib
│   └── jget.js
└── package.json

2 directories, 3 files
```

Não se esqueça de dar permissão de execução ao arquivo `bin/jget`, assim:

```sh
chmod +x bin/jget
```

Começando a criar...
--------------------

Vamos instalar a dependência [commander](https://www.npmjs.com/package/commander){:target="_blank"} para facilitar o processo.

```sh
npm install --save commander
```

beleza, em nosso arquivo executável dentro da pasta `bin` colocaremos o sequinte:

```js
#!/usr/bin/env node

require('../lib/jget');
```

lá vamos ter a linha `#!/usr/bin/env node` que é a fundamental para fazer funcionar, pois é ela que fala que quando chamarmos o arquivo quem execute ele é o `node`, e logo depois temos a chamada para nosso arquivo onde vamos escrever a CLI.

**você poderia colocar todo o código dentro do nosso executável, mas sabemos o custo de deixar tudo no mesmo arquivo :)**

começando a CLI em si, vamos colocar o sequinte no arquivo `jget.js` dentro da pasta `lib`:

```js
'use strict';

const program = require('commander'),
      pkg     = require('../package.json');


program
  .version(pkg.version)
  .parse(process.argv);
```

aqui, nós fizemos o require do modulo `commander` e do `package.json`, nesse caso o require do JSON serve apenas para quando atualizarmos a versão do nosso modulo, não precisarmos atualizar em tudo quanto é canto, bastando apenas mudar o JSON. Nas linhas a seguir passamos para o `commander` a versão da nossa ferramenta e logo depois pegamos os arqumentos passados pelo terminal vindos em coleção com `process.argv`, se quizer dar uma conferida nesse cara, é só dá uma olhada na [documentação do node](https://nodejs.org/api/process.html){:target="_blank"}.

Mas faça um teste só com isso, vá na raiz e digite `./bin/jget -h` ou `./bin/jget --help`, a saída será essa:

```js          
  Usage: jget [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

Adaptando as nossa necessidades
-------------------------------

Ok, vamos implementar de acordo com o que precisamos, o código do `jget.js` ficou o sequinte:

```js
'use strict';

const program = require('commander'),
      pkg     = require('../package.json');


program
  .version(pkg.version)
  .usage('<api>')
  .description('Simple CLI that made requests for any API')
  .action(function(api) {
    console.log(api);
  })
  .parse(process.argv);
```

antes de tudo é preciso entender que o modulo `commander` recebe os parametros como string, e quando você coloca eles entre `< >` como é o caso do argumento `<api>` ele se torna obrigatório, porém se você coloca-lo entre `[ ]`, ele se torna opcional.
Em `.usage('<api>')`, indicamos que usaremos o primeiro argumento pasado pelo ternimal e ele será mostrado  como forma de uso quando damos um `--help`.  
Logo depois temos o `.description('Simple CLI ..... API')` que é exatamente isso que esta pensando, ele mostrará do que se trata a CLI quando darmos o `--help`.  
Após isso temos o `.action(function[])`, ele é responsável por chamar a função que vai fazer a ação recebendo como parametro os argumentos vindo do terminal.


Tacando-le o pau no carrinho
============================

Show, pegamos a essência baguio, vamos começar de verdade agora!

![Will Smith dançando](/assets/img/fresh-prince-dance.gif)

Para continuar vamos fazer modularizando a parada, então para isso criei mais dois arquivos dentro da pasta `lib`, o `getApi.js` que será resonsável apenas por fazer a requisição para a API externa, e o `writeJson.js` que tem a função de gravar a _data_ em um arquivo JSON no diretório em que a CLI foi chamada.

Nosso arquivo principal, o `jget.js`:

```js
'use strict';

const program = require('commander'),
      pkg     = require('../package.json'),
      getAPI  = require('./getApi');


program
  .version(pkg.version)
  .usage('<api>')
  .description('Simple CLI that made requests for any API')
  .action(getAPI)
  .parse(process.argv);
```

Aqui fiz o require do getApi e troquei aquela função que estava no `.action()` colocando a que vem do `getApi`

**como você pode ver, não passei o parametro `api`, pois se eu fizer isso ele invoca a função e acusa que o parametro é _undefined_, colocando dessa forma o `commander` já sabe que tem um parametro sendo passado para ela.**


O meu arquivo `writeJson.js` ficou assim:

```js
'use strict';

const fs = require('fs');

module.exports = data => {
  fs.writeFileSync('./APIResult.json', data, 'utf8');
};
```

Ok, aqui não temos nada demais, fizemos o require do modulo _file systems_ do node, exportamos uma função que recebe um parametro e escreve sincrônamente um arquivo.

Já o meu arquivo `getApi.js` ficou dessa forma:

```js
'use strict';

const http = require('http'),
      WJSON = require('./writeJson');

module.exports = api => {

  api = api.split('/');

  const options = {
    host: api[0],
    method: 'GET',
    path: `/${api.slice(1).toString().replace(eval('/,/g'), '/')}`,
    headers: {
      'Content-Type': 'appication/json'
    }
  };

  const request = http.request(options, res => {
    res.setEncoding('utf8');

    res.on('data', pokeball => {
      WJSON(pokeball);
    });

    res.on('end', () => {
      console.log('Finalizado');
    });
  });

  request.end();
};
```

legal, agora vamos por partes, fiz o require do modulo _http_ do node e o também do arquivo que irá gravar o JSON, também exportei a função para podermos ter acesso do arquivo `jget.js`,  depois fiz a converção do parametro redefinindo ele mesmo para array, logo após o que muda são as linhas que estão o `host` e `path`.  
**Caso o que esteja vendo seja algo de outro mundo recomendo fortemente que dê uma olhada no modulo [http](https://nodejs.org/api/http.html){:target="_blank"} do node.**

no `host` eu peguei a primeira posição do array, ou seja só a parte principal da url o `pokeapi.co`, e na linha do `path` eu fiz um `slice` da 2ª posição do array em diante, conveti para string, depois fiz o `replace` de todas as ocorrências de `,` para `/` com ajuda de uma RegExp e da função `eval` que trata tudo como uma string, e se você tá ligado na parada, fiz também a concatenação de um `/` no começo.

Show de bola, que tal rodar o comando agora?

```sh
./bin/jget pokeapi.co/api/v1/pokemon/
```

eaí? o que aconteceu? olha a dica, dá uma olhada nos arquivos do seu diretório atual...

**ahhhh muleke, tirou onde véi! assim que se faz!**


Publicando no NPM!
===================

Para isso você precisa ter um cadrastro no site do [npm](https://www.npmjs.com/){:target="_blank"} e dar uma pesquisada no nome do modulo que você quer dar, por exemplo, o nome que eu quiz dar estava disponível, veja só:

![Imagem do resultado de busca do npm](/assets/img/npm-search.png)

depois de fazer isso, vamos dar o comando `npm adduser`, que irá pedir seu usuário, senha e email(esse e-mail ficará público), respondido as perguntas e estando logado no site do NPM, você precisa dar o comando `npm login`.


Logo após como temos uma pasta `node_modules`, obviamente não queremos que ela seja enviada para o NPM então crie um arquivo `.npmignore`, o uso desse arquivo é similar ao `.gitignore`, e então finalmente vamos dar o comando `npm publish`.

depois que executou o comando, a minha saída do terminal foi a seguinte:

```sh
+ jget@0.0.1
```

agora instalando o nosso pacote globalmente:

```sh
npm install -g jget
```

dê o comando para ver como ficou:

```sh
jget pokeapi.co/api/v1/pokemon/
```

eaí? o que aconteceu?

![Imagem do resultado de busca do npm](/assets/img/jiggy.gif)

**ahhhhhhhhhhhh muleke, funcionou! claro que funcionou é javascript sempre funciona :D**

Encerramento
============

Bom pessoal, nesse post aprendemos a fazer uma CLI, publicar no NPM, e ainda sair tirando onda por aí :P, mas enfim espero que tenham gostado e até a próxima.
