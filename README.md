# Consulta de Previsão do Tempo

Aplicação web estática para consultar as condições meteorológicas atuais e a previsão das próximas 24 horas de uma cidade.

## Funcionalidades

- Busca uma cidade pelo nome.
- Exibe temperatura atual e sensação térmica.
- Mostra horário local, umidade relativa, precipitação e cobertura de nuvens.
- Apresenta a previsão hora a hora para as próximas 24 horas.
- Seleciona imagens de acordo com as condições meteorológicas e o período do dia.

## Tecnologias

- HTML5
- CSS3
- JavaScript (API Fetch)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- Fonte [Poppins](https://fonts.google.com/specimen/Poppins), carregada pelo Google Fonts

## Como executar

O projeto não possui dependências para instalar. Como os arquivos usam caminhos absolutos para CSS, JavaScript e imagens, execute-o por um servidor local.

### Com o Live Server no VS Code

1. Instale a extensão **Live Server**.
2. Abra o arquivo `index.html`.
3. Clique em **Go Live** ou use a opção **Open with Live Server**.
4. A aplicação estará disponível em `http://localhost:5501`.

### Com outro servidor local

Na raiz do projeto, execute qualquer servidor HTTP estático. Por exemplo, com Python:

```bash
python -m http.server 5501
```

Depois, acesse `http://localhost:5501` no navegador.

## Como usar

1. Digite o nome de uma cidade no campo de busca.
2. Clique em **Enviar**.
3. Aguarde a localização da cidade e o carregamento da previsão.

## Estrutura do projeto

```text
.
├── index.html             # Estrutura da página
├── css/
│   └── style.css          # Estilos e layout
├── js/
│   └── script.js          # Buscas nas APIs e renderização da previsão
├── img/                   # Ícones e imagens das condições do tempo
└── .vscode/
	└── settings.json     # Porta configurada para o Live Server
```

## APIs e dados

O fluxo da aplicação é:

1. O nome informado é enviado à API de geocodificação da Open-Meteo.
2. A primeira cidade retornada fornece latitude, longitude e nome exibido.
3. Essas coordenadas são enviadas à API de previsão.
4. Os dados são renderizados diretamente no HTML, usando o fuso horário `America/Sao_Paulo`.

As APIs são públicas e não exigem chave de acesso para este projeto. É necessário estar conectado à internet para realizar consultas.

## Observações

- A aplicação usa o primeiro resultado retornado pela busca de cidade.
- No momento, erros de rede ou cidades não encontradas não são apresentados visualmente ao usuário.
- A previsão é configurada para o fuso horário de São Paulo.