function gviz(res) {
  res = res.split("setResponse(")[1]
  res = res.replace(");", "")
  res = JSON.parse(res)
  res = res.table.rows
  res = res.map(function(row) {
  	return row.c.map(function(cell) {
    	return cell.v
    })
  })
  var header = res.shift()
  res = res.map(function(row, r) {
  	return row.reduce(function(curr, acc, i) {
    	curr[header[i]] = acc
    	return curr
    }, {})
  })
  return res
}
