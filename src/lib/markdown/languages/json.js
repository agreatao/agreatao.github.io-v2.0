module.exports = function(hljs) {
    let ARRAY = { // Array
        begin: '\\[', end: '\\]',
        contains: [
            {
                end: ',', endsWithParent: true, excludeEnd: true,
                contains: [
                    {
                        className: 'string',
                        begin: '"', end: '"',
                        illegal: '\\n',
                        contains: [ hljs.BACKSLASH_ESCAPE ]
                    },
                    {
                        className: 'number',
                        begin: hljs.C_NUMBER_RE,
                        relevance: 0
                    }
                ],
                keywords: {
                    'literal': 'true false null'
                }
            }
        ]
    };
    let OBJECT = { // Object
        begin: '{', end: '}',
        contains: [
            {
                end: ',', endsWithParent: true, excludeEnd: true,
                contains: [
                    {
                        className: 'attr',
                        begin: '"', end: '"',
                        illegal: '\\n',
                        contains: [ hljs.BACKSLASH_ESCAPE ]
                    },
                    {
                        begin: /:/, end: ',', endsWithParent: true, excludeEnd: true,
                        contains: [
                            {
                                className: 'string',
                                begin: '"', end: '"',
                                illegal: '\\n',
                                contains: [ hljs.BACKSLASH_ESCAPE ]
                            },
                            {
                                className: 'number',
                                begin: hljs.C_NUMBER_RE,
                                relevance: 0
                            },
                            ARRAY
                        ],
                        keywords: {
                            'literal': 'true false null'
                        }
                    }
                ]
            }
        ]
    };
    ARRAY.contains[0].contains.push(OBJECT);
    OBJECT.contains[0].contains[1].contains.push(OBJECT);
    return {
        contains: [
            {
                begin: '"', end: '"',
                className: 'attr'
            },
            {
                begin: /:/, end: ',', endsWithParent: true, excludeEnd: true,
                contains: [
                    {
                        className: 'string',
                        begin: '"', end: '"',
                        illegal: '\\n',
                        contains: [ hljs.BACKSLASH_ESCAPE ]
                    },
                    {
                        className: 'number',
                        begin: hljs.C_NUMBER_RE,
                        relevance: 0
                    },
                    OBJECT, ARRAY
                ],
                keywords: {
                    'literal': 'true false null'
                }
            },
            OBJECT,
            ARRAY
        ]
    };
};