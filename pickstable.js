

function getPlayers() {
  fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/PLAYERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (players) {
      players = players.values.makeObj()
      console.log(players)
      players = players.filter(function(player) {
      	return player.ACTIVE == "TRUE"
      })
      players.sort(function(a, b) {
      	return a.PICKORDER - b.PICKORDER
      })
      players.forEach(function (player) {
        var tr = pt.insertRow()
        var td0 = tr.insertCell()
        var a = document.createElement("A")
        a.href = "javascript:void(0)"
        a.onclick = function() {
        	if (confirm("Alert " + player.PLAYERNAME + " to pick?")) {
          	fetch("https://script.google.com/macros/s/AKfycby3oJXHAF7Nx5rEXCd2Fy3mTdkRKHAkj9L-3m4cz-JMZet2Ug4DELuccc0Re4vfoYk/exec?" + encodeURIComponent(player.PHONE)).then(function(res) {
            alert("Success")
            })
          }
        }
        a.innerText = player.PLAYERNAME
        a.style.fontWeight = "bold"
        td0.append(a)
        
        + " <small>(" + Math.round(player.PICKORDER) + ")</small>"
        var div1 = document.createElement("DIV")
        var div2 = document.createElement("DIV")
        div1.innerText = player.DRIVERNAME1 || null
        div2.innerText = player.DRIVERNAME2 || null
        var td = tr.insertCell()
        td.append(div1)
        td.append(div2)
      })
    })
}

getPlayers()
