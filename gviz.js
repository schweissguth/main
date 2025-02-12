function gviz(obj) {
	obj = obj.split("setResponse(")[1].slice(0, -2)
  obj = JSON.parse(obj)
  obj = obj.table
  console.log(obj)
  var rows = obj.rows
  console.log("rows", rows)
  var cols = obj.cols
  console.log("cols", cols)

  var arr = []
  
  rows.forEach(function(row) {
    var newobj = {}
    console.log("row", row)
  	row.c.forEach(function(cell, c) {
      newobj[cols[c].label] = cell.v
    })
    arr.push(newobj)
  })
  return arr
}
