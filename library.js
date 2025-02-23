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

Array.prototype.vlookup = function (input, refkey, returnkey) {
  var find = this.findLast(function (find) {
    find[refkey] == input
  })
  return (
    find[returnkey] || {
      [returnkey]: null,
    }
  )
}
