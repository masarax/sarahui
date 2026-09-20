// Zero-dependency VS Code / Shiki syntax colorizer for sarahUI docs

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const JS_KEYWORDS = new Set([
  'import', 'export', 'from', 'as', 'default',
  'const', 'let', 'var', 'function', 'return',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'new', 'this', 'class', 'extends', 'super',
  'typeof', 'instanceof', 'void', 'delete', 'in', 'of',
  'async', 'await', 'yield',
  'try', 'catch', 'finally', 'throw',
  'true', 'false', 'null', 'undefined'
]);

export function highlightJs(code) {
  const tokens = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    // Single line comment
    if (code[i] === '/' && code[i + 1] === '/') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = len;
      tokens.push(`<span class="token-comment">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Multi line comment
    if (code[i] === '/' && code[i + 1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = len;
      else end += 2;
      tokens.push(`<span class="token-comment">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Single quoted string
    if (code[i] === "'") {
      let end = i + 1;
      while (end < len && (code[end] !== "'" || code[end - 1] === '\\')) end++;
      if (end < len) end++;
      tokens.push(`<span class="token-string">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Double quoted string
    if (code[i] === '"') {
      let end = i + 1;
      while (end < len && (code[end] !== '"' || code[end - 1] === '\\')) end++;
      if (end < len) end++;
      tokens.push(`<span class="token-string">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Template string
    if (code[i] === '`') {
      let end = i + 1;
      while (end < len && (code[end] !== '`' || code[end - 1] === '\\')) end++;
      if (end < len) end++;
      tokens.push(`<span class="token-string">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // JSX closing tag: </Tag>
    if (code[i] === '<' && code[i + 1] === '/') {
      let end = i + 2;
      while (end < len && /[a-zA-Z0-9_.-]/.test(code[end])) end++;
      const tag = code.slice(i + 2, end);
      tokens.push(`<span class="token-punct">&lt;/</span><span class="token-tag">${escapeHtml(tag)}</span>`);
      i = end;
      continue;
    }

    // JSX opening tag: <Tag or <tag
    if (code[i] === '<' && /[a-zA-Z]/.test(code[i + 1] || '')) {
      let end = i + 1;
      while (end < len && /[a-zA-Z0-9_.-]/.test(code[end])) end++;
      const tag = code.slice(i + 1, end);
      tokens.push(`<span class="token-punct">&lt;</span><span class="token-tag">${escapeHtml(tag)}</span>`);
      i = end;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i]) && (i === 0 || /[\s,(:=+\-*/[\]{}]/.test(code[i - 1]))) {
      let end = i;
      while (end < len && /[\d.eE_]/.test(code[end])) end++;
      tokens.push(`<span class="token-number">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Word (identifier, keyword, property, function, type)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let end = i;
      while (end < len && /[a-zA-Z0-9_$]/.test(code[end])) end++;
      const word = code.slice(i, end);

      // Check if followed by colon (property key in object)
      let nextNonSpace = end;
      while (nextNonSpace < len && code[nextNonSpace] === ' ') nextNonSpace++;
      const isProp = nextNonSpace < len && code[nextNonSpace] === ':' && code[nextNonSpace + 1] !== ':';

      // Check if followed by open paren (function call)
      const isFn = nextNonSpace < len && code[nextNonSpace] === '(';

      if (JS_KEYWORDS.has(word)) {
        tokens.push(`<span class="token-keyword">${escapeHtml(word)}</span>`);
      } else if (isProp) {
        tokens.push(`<span class="token-prop">${escapeHtml(word)}</span>`);
      } else if (/^[A-Z][a-zA-Z0-9]*$/.test(word)) {
        tokens.push(`<span class="token-type">${escapeHtml(word)}</span>`);
      } else if (isFn) {
        tokens.push(`<span class="token-fn">${escapeHtml(word)}</span>`);
      } else {
        tokens.push(`<span class="token-ident">${escapeHtml(word)}</span>`);
      }
      i = end;
      continue;
    }

    // Punctuation & Operators
    if (/[\{\}\(\)\[\];,:]/.test(code[i])) {
      tokens.push(`<span class="token-punct">${escapeHtml(code[i])}</span>`);
      i++;
      continue;
    }

    if (/[=+\-*/&|!<>?~^%]/.test(code[i])) {
      let end = i;
      while (end < len && /[=+\-*/&|!<>?~^%]/.test(code[end])) end++;
      tokens.push(`<span class="token-operator">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    // Whitespace and others
    tokens.push(escapeHtml(code[i]));
    i++;
  }

  return tokens.join('');
}

export function highlightHtml(code) {
  const escaped = escapeHtml(code);
  return escaped.replace(/(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([a-zA-Z0-9-]+)((?:\s+[a-zA-Z0-9_:-]+(?:=(?:&quot;[^&]*&quot;|&#39;[^&]*&#39;|"[^"]*"|'[^']*'|[^\s&>]+))?)*\s*)(&gt;)/g,
    (match, comment, open, tag, attrs, close) => {
      if (comment) return `<span class="token-comment">${comment}</span>`;
      let formattedAttrs = '';
      if (attrs) {
        formattedAttrs = attrs.replace(/(\s+)([a-zA-Z0-9_:-]+)(?:(=)("[^"]*"|'[^']*'|&quot;[^&]*&quot;|&#39;[^&]*&#39;|[^\s&>]+))?/g,
          (_, space, name, eq, val) => {
            let res = `${space}<span class="token-attr">${name}</span>`;
            if (eq) {
              res += `<span class="token-punct">${eq}</span>`;
              if (val) res += `<span class="token-string">${val}</span>`;
            }
            return res;
          }
        );
      }
      return `${open}<span class="token-tag">${tag}</span>${formattedAttrs}${close}`;
    }
  );
}

export function highlightCss(code) {
  const tokens = [];
  let i = 0;
  const len = code.length;
  let inRule = false;

  while (i < len) {
    // Comment
    if (code[i] === '/' && code[i + 1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = len;
      else end += 2;
      tokens.push(`<span class="token-comment">${escapeHtml(code.slice(i, end))}</span>`);
      i = end;
      continue;
    }

    if (code[i] === '{') {
      inRule = true;
      tokens.push(`<span class="token-punct">{</span>`);
      i++;
      continue;
    }

    if (code[i] === '}') {
      inRule = false;
      tokens.push(`<span class="token-punct">}</span>`);
      i++;
      continue;
    }

    // Inside rule: property or value
    if (inRule) {
      // Property (starts with - or letter up to :)
      if (/[-a-zA-Z]/.test(code[i])) {
        let end = i;
        while (end < len && /[-a-zA-Z0-9_]/.test(code[end])) end++;
        let nextNonSpace = end;
        while (nextNonSpace < len && code[nextNonSpace] === ' ') nextNonSpace++;
        if (nextNonSpace < len && code[nextNonSpace] === ':') {
          tokens.push(`<span class="token-prop">${escapeHtml(code.slice(i, end))}</span>`);
          i = end;
          continue;
        }
      }

      // String in value
      if (code[i] === '"' || code[i] === "'") {
        const q = code[i];
        let end = i + 1;
        while (end < len && code[end] !== q) end++;
        if (end < len) end++;
        tokens.push(`<span class="token-string">${escapeHtml(code.slice(i, end))}</span>`);
        i = end;
        continue;
      }

      // Number in value
      if (/\d/.test(code[i])) {
        let end = i;
        while (end < len && /[\d.pxrem%emvhwsdeg]/.test(code[end])) end++;
        tokens.push(`<span class="token-number">${escapeHtml(code.slice(i, end))}</span>`);
        i = end;
        continue;
      }

      // Function in value (e.g. var(--...))
      if (/[a-zA-Z]/.test(code[i])) {
        let end = i;
        while (end < len && /[-a-zA-Z0-9_]/.test(code[end])) end++;
        const word = code.slice(i, end);
        if (code[end] === '(') {
          tokens.push(`<span class="token-fn">${escapeHtml(word)}</span>`);
        } else if (word.startsWith('--')) {
          tokens.push(`<span class="token-attr">${escapeHtml(word)}</span>`);
        } else {
          tokens.push(`<span class="token-ident">${escapeHtml(word)}</span>`);
        }
        i = end;
        continue;
      }
    } else {
      // Outside rule: selector
      if (/[\.#a-zA-Z_:-]/.test(code[i])) {
        let end = i;
        while (end < len && /[^\s{]/.test(code[end])) end++;
        tokens.push(`<span class="token-tag">${escapeHtml(code.slice(i, end))}</span>`);
        i = end;
        continue;
      }
    }

    if (/[\{\}\(\)\[\];,:]/.test(code[i])) {
      tokens.push(`<span class="token-punct">${escapeHtml(code[i])}</span>`);
      i++;
      continue;
    }

    tokens.push(escapeHtml(code[i]));
    i++;
  }

  return tokens.join('');
}

export function highlightBash(code) {
  const lines = code.split('\n');
  const PKG_MANAGERS = new Set(['npm', 'pnpm', 'yarn', 'bun', 'npx', 'git', 'node', 'cd', 'mkdir']);
  const ACTIONS = new Set(['install', 'add', 'i', 'clone', 'run', 'create', 'build', 'test']);

  return lines.map(line => {
    if (line.trim().startsWith('#')) {
      return `<span class="token-comment">${escapeHtml(line)}</span>`;
    }
    const escaped = escapeHtml(line);
    const parts = [];
    let i = 0;
    const len = escaped.length;
    let wordIndex = 0;

    while (i < len) {
      if (escaped[i] === '"' || escaped[i] === "'") {
        const q = escaped[i];
        let end = i + 1;
        while (end < len && escaped[end] !== q) end++;
        if (end < len) end++;
        parts.push(`<span class="token-string">${escaped.slice(i, end)}</span>`);
        i = end;
        wordIndex++;
        continue;
      }
      if (escaped[i] === '-' && (i === 0 || /\s/.test(escaped[i - 1]))) {
        let end = i;
        while (end < len && /[a-zA-Z0-9_.-]/.test(escaped[end])) end++;
        parts.push(`<span class="token-attr">${escaped.slice(i, end)}</span>`);
        i = end;
        wordIndex++;
        continue;
      }
      if (/[a-zA-Z0-9_./@:-]/.test(escaped[i])) {
        let end = i;
        while (end < len && /[a-zA-Z0-9_./@:-]/.test(escaped[end])) end++;
        const token = escaped.slice(i, end);
        if (PKG_MANAGERS.has(token) || wordIndex === 0) {
          parts.push(`<span class="token-keyword">${token}</span>`);
        } else if (ACTIONS.has(token) || wordIndex === 1) {
          parts.push(`<span class="token-fn">${token}</span>`);
        } else {
          parts.push(`<span class="token-string">${token}</span>`);
        }
        i = end;
        wordIndex++;
        continue;
      }
      parts.push(escaped[i]);
      i++;
    }
    return parts.join('');
  }).join('\n');
}

export function highlightCode(code, lang = 'javascript', options = {}) {
  if (!code) return '';
  const l = String(lang).toLowerCase();
  const isTerminal = l.includes('bash') || l.includes('sh') || l.includes('terminal') || l.includes('shell');
  const showLineNumbers = options.showLineNumbers !== undefined 
    ? options.showLineNumbers 
    : (code.includes('\n') && !isTerminal);
  let result = '';
  if (l.includes('html') || l.includes('xml')) {
    result = highlightHtml(code);
  } else if (l.includes('css')) {
    result = highlightCss(code);
  } else if (isTerminal) {
    result = highlightBash(code);
  } else {
    result = highlightJs(code);
  }
  if (!showLineNumbers) return result;
  return result.split('\n').map(line => `<span class="token-line">${line || ' '}</span>`).join('');
}
