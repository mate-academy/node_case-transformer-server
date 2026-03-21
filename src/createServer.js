'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    // A resposta deve ser sempre retornada em formato JSON
    res.setHeader('Content-Type', 'application/json');

    // Separa a URL em duas partes: o caminho da rota principal
    // (pathname) e os eventuais parâmetros (queryString)
    const [pathname, queryString] = req.url.split('?');
    // Remove o caracter '/' inicial para isolar apenas o texto
    // que a api vai converter
    const textToConvert = pathname.slice(1);

    // Usa a classe URLSearchParams (nativa do node) para processar
    // os parâmetros enviados de forma fácil
    const params = new URLSearchParams(queryString || '');
    // Extrai especificamente o valor do parâmetro associado a '?toCase'
    const toCase = params.get('toCase');

    // Array preparado para acumular mais de uma validação falha
    // num mesmo retorno
    const errors = [];

    // Validação 1: O texto inserido após a barra deve existir
    // (exemplo: /hello_world)
    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    // Validação 2: Verificar também se informaram a case (ex: ?toCase=CAMEL)
    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      // Validação 3: Interceptar caso enviem um padrão toCase
      // que não existe no suporte oficial
      errors.push({
        message:
          'This case is not supported.' +
          ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // Se o array não for vazio, algo reprovou.
    // Vamos devolver JSON finalizando com status 400 Bad Request
    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Caso de requisição válida: delegar a resolução ao business logic
    // para processar e converter cases
    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    // Sucesso - 200 OK
    res.writeHead(200, 'OK');

    // Submete a conversão para visualização do cliente
    // na web em formato string JSON
    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
