const urlParser = function() {
    let { search } = window.location;
    let kvs = search.substr(1);
    let query = {};
    if(kvs) {
        kvs.split("&").forEach((item, index) => {
            if(item) {
                let [key, value] = item.split("=");
                if(key && key != "" && value && value != "")
                    query[key] = value;
            }
        });
    }
    return { ...window.location, query };
};

urlParser.formatSearch = function(str) {
    let query = {};
    if(str) {
        str.split("&").forEach((item, index) => {
            if(item) {
                let [key, value] = item.split("=");
                if(key && key != "" && value && value != "")
                    query[key] = value;
            }
            
        });
    }
    return query;
}

export default urlParser;
