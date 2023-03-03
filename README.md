![LottoCrypto](https://i.ibb.co/x5smjPp/Screenshot-8.png)

# LottoCrypto
Este projeto consiste em uma plataforma de loteria baseada em Blockchain, onde os participantes podem comprar ingressos usando criptomoedas e participar de sorteios para ganhar prêmios em criptomoedas. O objetivo deste projeto é criar uma plataforma de loteria justa, transparente e descentralizada que possa ser acessada por qualquer pessoa em qualquer lugar do mundo.

![LottoCrypto](https://i.ibb.co/bRWj61R/image.png)

## Funcionalidades do Projeto

#### Compra de ingressos:
 Os participantes podem comprar ingressos usando criptomoedas. Cada ingresso é um token ERC-20 único gerado por um contrato inteligente na rede Ethereum.
#### Sorteios: 
Os sorteios são realizados automaticamente pelo contrato inteligente. Os vencedores são escolhidos aleatoriamente usando um algoritmo de geração de números aleatórios na rede Ethereum.
#### Transparência: 
Todos os resultados do sorteio são publicados na rede Ethereum e são imutáveis. Qualquer pessoa pode verificar a integridade dos sorteios. 
## Tecnologias Utilizadas

- **Ethereum Blockchain**: A plataforma Ethereum é usada como base para a implementação da loteria Crypto. É a plataforma de escolha para criar aplicativos descentralizados usando contratos inteligentes.
- **Solidity**: A linguagem de programação usada para escrever os contratos inteligentes da loteria.
- **Truffle**: O framework de desenvolvimento de contrato inteligente Truffle é usado para compilar, testar e implantar os contratos inteligentes na rede Ethereum.
- **Web3.js**: Biblioteca usada para conectar o frontend com os contratos inteligentes na rede Ethereum.
## Instruções de Instalação

Para rodar o projeto localmente, siga os seguintes passos:

- Clone o repositório para sua máquina local:

```bash
  git clone https://github.com/nome-do-repositorio.git
```
    
- Instale as dependências do projeto:
```bash
npm install
```
- Configure suas credenciais da rede Ethereum em um arquivo .env na raiz do projeto:
```bash
ETHERSCAN_API_KEY=your_etherscan_api_key
MNEMONIC=your_wallet_mnemonic
```
- Compile e implante os contratos inteligentes:
```bash
truffle migrate --network <nome-da-rede>
```
- Inicie o servidor local:
```bash
npm start
```
- Acesse o aplicativo em seu navegador em http://localhost:3000.

## Contribuindo para o Projeto:

Sinta-se à vontade para contribuir para este projeto criando novas funcionalidades, corrigindo bugs ou melhorando a documentação. Para contribuir, siga as seguintes etapas:

- Crie um fork deste repositório em sua conta do GitHub.
- Clone o fork para sua máquina local.
- Crie uma nova branch para suas alterações:
```bash
git checkout -b my-feature-branch
```
- Faça suas alterações e faça commit das mudanças:
```bash
git commit -m "Adiciona uma nova funcionalidade"
```
- Envie suas alterações para o seu fork no GitHub:
```bash
git push origin my-feature-branch
```
- Abra um pull request no repositório original e aguarde a revisão e aprovação do mantenedor.
