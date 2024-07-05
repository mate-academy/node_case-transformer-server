# Case transformer server

In this task you will learn how to work with `http` module in Node.js, creating your own simple server.

## Requirements

You need to create and export (as an object field) a `createServer` function inside `src/createServer.js`.
Inside the function you should implement a server (from `http` module) and return it.

You can create as many files as you want and split logic between them.

### Server requirements

Server should have single function - converting text between cases.
Supported cases:

- snake_case (`SNAKE`)
- kebab-case (`KEBAB`)
- camelCase (`CAMEL`)
- PascalCase (`PASCAL`)
- UPPER_CASE (`UPPER`)

Server accepts request to the URL in the next format:
`/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>`.

<details>
  <summary><strong>How to parse URL query params</strong></summary>
  Node.js has built-in global class `URLSearchParams`. [Documentation](https://nodejs.org/api/url.html#class-urlsearchparams).
  It will do work for you.
</details>

<details>
  <summary><strong>How to parse URL hint</strong></summary>
  First, split `req.url` by `?`.
  The first part is almost the text you need to convert.
  The second param is a query string. Use `URLSearchParams` to parse it:
  ```javascript
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');
  ```
</details>

Examples:
For request `/createServer?toCase=SNAKE` result should be `create_server`.

Business logic (converting cases) are carefully implemented for you to focus on work with the server specific stuff. You need to work on reading data from URL, validating it, forming response and errors.

#### General rules

Server should always respond with a JSON type.
That means you should always add a correct `Content-Type` header.

#### Validation

Text in the URL and query param `toCase` are mandatory. Also, `toCase` value should be one of the supported cases.
If something is not correct, you should respond with 400 status, `Bad request` statusText and the next payload:

```json
{
  "errors": [
    {
      "message": "<SPECIFIC MESSAGE TEXT HERE>"
    }
  ]
}
```

Array of messages can contain more than one error. For example, if both text and case are not provided.

Messages:

- If text is missing: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
- If `toCase` is missing: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
- If `toCase` value is not from listed above: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`

#### Invoke business logic

If validation is called you should invoke business logic (`convertToCase` function from `src/convertToCase` folder). It accepts two params: case name and text to convert.

> Business logic is also covered with tests. They are already passed. Just for you to be sure that it works correctly.

Function return the next object:

```javascript
{
  originalCase: 'CASE_NAME',
  convertedText: 'CONVERTED_TEXT',
}
```

For example:

```javascript
const result = convertToCase('UPPER', 'writeFile');

console.log(result); // { originalCase: 'CAMEL', convertedText: 'WRITE_FILE' }
```

#### Respond to the client

You should respond with status 200 and `OK` status text.

Response body should be the next JSON:

```json
{
  "originalCase": "CASE_NAME",
  "targetCase": "CASE_NAME",
  "originalText": "ORIGINAL_TEXT",
  "convertedText": "CONVERTED_TEXT"
}
```

Example:

```json
{
  "originalCase": "KEBAB",
  "targetCase": "PASCAL",
  "originalText": "hello-world",
  "convertedText": "HelloWorld"
}
```

## Guidelines to work on project

- Fork this repo.
- After cloning repo, run `npm i`.
- Run `npm run test:watch` to have automatically rerun tests on code change.
- Work until all tests are green.
- Commit and push changes.
- Make PR to Mate academy repo.

> You can run `npm start` to have working server locally.
