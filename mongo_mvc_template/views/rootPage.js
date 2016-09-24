// Define a template. It’s just a function that returns a template literal string.
module.exports = (req, data) =>
  `<!DOCTYPE html>
  <html>
    <head>
    <title>${data.title}</title>
    <link rel="stylesheet" type="text/css" href="/css/application.css">
    </head>
    <body>
      <h1 class="welcome">${data.content}</h1>
      <p class="notice">${data.notice}</p>
      <p class="server">Server is on: ${req.headers.host}</p>
    </body>
  </html>`;
