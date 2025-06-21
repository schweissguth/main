getPickorder().then(function(pickers) {
  console.log(pickers)
  pickstable.innerHTML = null
  pickers.forEach(function(picker) {
    let tr = pickstable.insertRow()
    let td = tr.insertCell()
    let a = document.createElement("A")
    a.innerHTML = picker.playername + " <small>(" + picker.TOTAL + ")</small>"
    a.href = "javascript:"
    a.style.fontWeight = "bold"
    a.onclick = function() {
      if (confirm("Alert " + picker.playername + " to pick?")) {
        fetch("https://script.google.com/macros/s/AKfycby3oJXHAF7Nx5rEXCd2Fy3mTdkRKHAkj9L-3m4cz-JMZet2Ug4DELuccc0Re4vfoYk/exec?" + encodeURIComponent(picker.cell))
        alert("Success")
      }
    }
    td.append(a)
    td = tr.insertCell()
    picker.picks.forEach(function(pick) {
      let div = document.createElement("DIV")
      div.innerText = pick.driver_name
      td.append(div)
    })
  })
})
