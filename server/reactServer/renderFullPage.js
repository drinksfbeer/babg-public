
function renderFullPage({
  html,
  preloadedState,
  bundleUrl,
  helmet,
  styleUrl,
}) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://use.fontawesome.com/releases/v5.3.1/css/svg-with-js.css" rel="stylesheet"></link>
        <link rel="stylesheet" type="text/css" href=/${styleUrl} />
        <link rel="stylesheet" href="https://use.typekit.net/exn5oeg.css">      
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="${bundleUrl}"></script>
      </body>
    </html>
  `;
}

export default renderFullPage;
