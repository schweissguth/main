Array.prototype.makeObj = function () {
  var header = this.shift()
  var json = this.map(function (row) {
    return row.reduce(function (acc, cur, i) {
      acc[header[i]] = cur
      return acc
    }, {})
  })
  //console.log(this, json)
  return json
}
