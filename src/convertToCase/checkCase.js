function checkCase(caseName) {
  switch (caseName) {
    case 'SNAKE': {
      return true;
    }

    case 'KEBAB': {
      return true;
    }

    case 'UPPER': {
      return true;
    }

    case 'PASCAL': {
      return true;
    }

    case 'CAMEL': {
      return true;
    }

    default: {
      return false;
    }
  }
}

module.exports = {
  checkCase,
};
