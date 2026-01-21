const handleFaviconRequest = (response) => {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.end();
};

module.exports = { handleFaviconRequest };
