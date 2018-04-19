const URI = 'https://home.meishichina.com/ajax/ajax.php';

const fetch = require('./fetch')

function fetchApi(params) {
    return fetch(URI, params)
}

function find(ac = 'recipe', op = 'getMoreDiffStateRecipeList', classid = '0', orderby = 'hot', page = 2) {
    const params = {
        ac: ac,
        op: op,
        classid: classid,
        orderby: orderby,
        page: (page - 1)
    }
    return fetchApi(Object.assign({}, params)).then(res => res.data)
}

module.exports = {
    find
}
