function gviz(url) {
  fetch(url)
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      res = res.values
      console.log(res)
      var header = res.shift()
      var array = res.map(function (row) {
        return row.reduce(function (acc, cur, i) {
          acc[header[i]] = cur
          return acc
        }, {})
      })
      console.log(array)
      return array
    })
}
