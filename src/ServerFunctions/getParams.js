const getParams = (array) => {
  const [textFromRequest, caseFromRequest] = array;

  const textToConvert = textFromRequest.slice(1);
  const paramsToChange = new URLSearchParams(caseFromRequest);
  const caseToChange = paramsToChange.get('toCase');

  return [textToConvert, caseToChange];
};

module.exports = { getParams };
