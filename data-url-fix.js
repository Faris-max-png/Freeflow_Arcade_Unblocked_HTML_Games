(function() {
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/';
  const originalOpen = window.open.bind(window);

  window.open = function(...args) {
    const popup = originalOpen(...args);

    if (!popup || !popup.document) return popup;

    const fixHtml = function(html) {
      if (typeof html !== 'string') return html;
      return html.replace(/<head\s*>/i, '<head><base href="' + CDN_BASE + '">');
    };

    const originalWrite = popup.document.write.bind(popup.document);
    popup.document.write = function(html) {
      return originalWrite(fixHtml(html));
    };

    if (popup.document.writeln) {
      const originalWriteln = popup.document.writeln.bind(popup.document);
      popup.document.writeln = function(html) {
        return originalWriteln(fixHtml(html));
      };
    }

    return popup;
  };
})();
