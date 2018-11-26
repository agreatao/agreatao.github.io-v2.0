import './style/index.less';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('shell', require('./languages/shell'));
hljs.registerLanguage('json', require('./languages/json'));

hljs.configure({
    languages: [
        'shell', 'python',
        'css', 'scss', 'less', 'html',
        'javascript', 'java', 'json'
    ]
});

let myMark = new marked.Renderer();

myMark.code = function(code, lang, escaped) {
    let hl = hljs.highlightAuto(code, [ lang ]);
    return `<div class="highlight hightlight-source-${lang}"><pre>${hl.value}</pre></div>`;
}

marked.setOptions({
    renderer: myMark,
    breaks: true
});

export default marked;