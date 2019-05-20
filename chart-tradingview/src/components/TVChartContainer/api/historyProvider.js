var rp = require('request-promise').defaults({json: true})

const api_root = 'https://min-api.cryptocompare.com'
const history = {}

export default {
    history: history,
    getBars: function (symbolInfo, resolution, from, to, first, limit) {
        var symbol = symbolInfo.name.split(":");
        const url = "https://cors-anywhere.herokuapp.com/https://api.vietstock.vn/ta/history?symbol=" + symbol + "&resolution=" + resolution + "&from=" + from + "&to=" + to;
        const qs = {
            toTs: to ? to : '',
            limit: limit ? limit : 1000,
        }
        return rp({
            url: url,
            qs,
        }).then(data => {
            data = JSON.parse(data);
            let ohlc = [],
                i = 0;
            let len = data.t.length;
            for (i; i < len; i += 1) {
                var a = {
                    time: data.t[i] * 1000,
                    low: data.l[i],
                    high: data.h[i],
                    open: data.o[i],
                    close: data.c[i],
                    volume: data.v[i]
                }
                ohlc.push(a)
            }
            return ohlc
        })
    }
}
