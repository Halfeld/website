---
layout: post
title: "Escalonando aplicações Node.js"
desc: "Processos, Load Balancer e Reverse-Proxy"
lang: "Portuguese"
date: 2016-04-12T00:00:00.000Z
image: escalonar-nodejs.png
---

Hey galera, olha eu de volta aqui para falar de Node <3

Sem dúvida se você tiver uma aplicação em produção em algum momento chega a hora de escalonar ~~claro se o projeto tiver dado certo :P~~ e o seu back-end for em node, acaba aparecendo uma dúvida em sua cabeça pensante...

> Tá aumentando o número de requisições, a parada tá crescendo... E agora mano?

calma véi... fica de boa e pega um café qué nois :D

# Como faço para escalonar com node?

Bem, para você "sacar" melhor este post recomendo fortemente dar uma olhada nessa [playlist](https://www.youtube.com/watch?v=KtDwdoxQL4A&list=PLQCmSnNFVYnTFo60Bt972f8HA4Td7WKwq){:target="_blank"} do [Rodrigo Branas](https://twitter.com/rodrigobranas){:target="_blank"} que falam tanto da história do node quanto seu funcionamento.

Tendo em mente que você já assistiu os vídeos ou já manja dos paranauês...<br>
O node não trabalha com suporte a _Multi-Treads_ algo já presente em outras plataformas, mas ele permite sim processamento em paralelo, para isso existe o modulo nativo **cluster**.

# Cluster

Ele basicamente instacia novos processos da aplicação, podendo ter quantos processos você quizer, claro que para ter efeito é necessário que o número que instâncias que você criar seja o mesmo número de núcleos do CPU de seu servidor, essas instâncias compartilham a mesma porta na rede e são independentes umas das outras(se uma instância ficar offline, segue funcionando).

Para se ter melhor eficiência na distruição de requisições, é necessário que exista um processo pai, o chamado **cluster master**, que será o responsável por fazer o distribuimento de forma justa para os filhos(clusters slaves).

## Falar é facil néh mermão, me mostre o código!

Vamos criar um arquivo chamado `cluster.js` e então colocar esse código nele:

```javascript
'use strict';

const http = require('http'),
      cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    return;
}


const server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Escalonando aplicações NodeJs</h1>');
  res.end();
});

server.listen(4000, function(){
  console.log('Servidor no ar');
});
```

Ok, o que é realmente intereçante para nós aqui é o cluster que fiz um require e logo depois fiz aquele `if(cluster.isMaster)`, que basicamente verifica se é o cluster master, caso ele seja, ele cria instâncias com `cluster.fork()` e em seguida retorna. Note que fiz 4 vezes o `cluster.fork()` isto porquê a maquina que estou usando tem 4 núcleos, se tivesse mais, faria mais instâncias.

Olhando a saida do terminal ele sobe quatro processos:

```sh
Servidor no ar
Servidor no ar
Servidor no ar
Servidor no ar
```

Ainda é possível fazer muita coisa com esse meninão, basta dar uma olhadinha na [documentação](https://nodejs.org/api/cluster.html){:target="_blank"} que o baguio é loko muleke.

# Reverse-Proxy

**Para este post vamos usar o nginx como server, não vou entrar em detalhes de como instalar, você pode dar uma olhada na [documentação](https://www.nginx.com/resources/wiki/){:target="_blank"} que é bem bacana :)**

Para aumentarmos a perfomace da aplicação vamos usar um _Reverse-Proxy_ do nginx com node e também um _static server_ fazendo com que o node apenas processe as rotas, diminuindo o número de requisições diretas na aplicação.

Beleza, agora vamos até o arquivo `nginx.conf` para fazer os procedimentos. A parte do arquivo que realmente nos interessa é essa:

**A localização desse arquivo varia de acordo com o seu sistema operacional, aqui no meu fedora esta em `/etc/nginx/nginx.conf`, de uma procurada aí que tu acha véi**

```
server {
  listen 80;
  server_name localhost;
  access_log logs/access.log;

  location /static {
    root /meuapp/public;
    expires max;
  }

  location / {
    proxy_pass http://localhost:3000;
  }
}
```

legal, na linha `root /meuapp/public;` indicamos o caminho para os arquivos estáticos assumindo que a pasta `/meuapp` esteja na raiz do seu sistema operacional e na linha `proxy_pass http://localhost:3000` aplicamos o _Reverse-Proxy_ colocando a url com a porta que subimos o servidor node, para ser feito o redirecionamento para as demais rotas da aplicação.

# Load Balancer

Para entender _Load Balancer_ precisamos entender dois conceitos:

- **Escalonamento vertical**: Seria você adicionar mais recursos em um único sistema (mais memória ou um disco rígido mais rápido).

<br>

- **Escalonamento horizontal**: Seria você adicionar mais nós ao sistema, tais como um novo computador com uma aplicação para "clusterizar" o software.

Ok, um _Load Balancer_ seria um balanceamento de carga, ou seja, colocar mais máquinas rodando em conjunto com a principal tendo um escalonamento horizontal.

O nginx possui suporte para três mecanismos de balanceamento de carga, são eles:

<br>

- **Round-Robin**: (padrão) Distribuição feito de forma circular, ou seja, se tivermos três máquinas e seis requisições, a distribuição ficará assim:

Servidores | Requisições
---------- | -----------
Servidor 1 | Req 1       | Req 4
Servidor 2 | Req 2       | Req 5
Servidor 3 | Req 3       | Req 6

ou seja, segue 1-2-3, 1-2-3, 1-2-3 ....

<br>

- **Least-connected**: A próxima conexão é direcionada para o servidor com menos conexões ativas

<br>

- **Ip-Hash**: Usamos quando queremos distribuir as requisições entre os componentes baseado no endereço IP do cliente que tem como origem a requisição.

**Esta configuração que vou amostrar é apenas para entendermos o conceito, para mais informações, já sabe [documentação marota](http://nginx.com/resources/admin-guide/load-balancer/){:target="_blank"} :P**

<br>

Exemplo de _Load Balancer_:

![Exemplo de load balancer](/assets/img/load-balancing.png)

vamos ao arquivo `nginx.conf` na parte que nos interessa de novo e acrecentar o seguinte:

```
server {
  listen 80;
  server_name localhost;
  access_log logs/access.log;

  location /static {
    root /meuapp/public;
    expires max;
  }

  location / {
    proxy_pass http://localhost:3000;
  }
}

upstream myworksblog {
  least_conn;

  server 192.313.42.32;
  server 192.414.53.11;
}
```

Aqui acrescentamos o bloco `upstream` que tem a seguinte linha `least_conn;` que indica qual é o metodo de _balancer_ que eu quero e logo em seguida temos nossos outros servidores ao qual serão distribuidos as requisições. (coloquei IPs aleatórios que vieram na minha cabeça)

# Encerramento

Loko, agora temos uma noção de como escalonar aplicações nodejs, muito se tem a aprender em relação a isso, mas sempre buscando mais nós consegue hehehehe. Até a próxima ;)
