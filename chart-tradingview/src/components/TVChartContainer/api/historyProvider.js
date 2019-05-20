var rp = require('request-promise').defaults({json: true})

const api_root = 'https://min-api.cryptocompare.com'
const history = {}

export default {
    history: history,

    getBars: function (symbolInfo, resolution, from, to, first, limit) {
        var symbol = symbolInfo.name.split(":");
        const url = "https://cors-anywhere.herokuapp.com/https://api.vietstock.vn/ta/history?symbol=" + symbol + "&resolution=D&from=1025277724&to="+Math.floor(Date.now() / 1000);
        const qs = {
            toTs: to ? to : '',
            limit: limit ? limit : 1000,
        }
        return rp({
            // url: "http://localhost:8000/api/history",
            url: url,
            qs,
        })
            .then(data => {
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
