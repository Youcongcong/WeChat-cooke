/**
 * @param {String} api  请求根地址
 * @param {String} path 请求路径
 * @param {String} params  请求参数
 * @return {Promise} 
 */

module.exports = function(api,params){
    return new Promise((resolve,reject)=>{
        wx.request({
            url:`${api}`,
            data:Object.assign({},params),
            header:{'Content-Type': 'json'},
            success:resolve,
            fail:reject
        })
    })
}