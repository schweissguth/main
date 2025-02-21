

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
        tr.insertCell().innerHTML = "<b>" + player.PLAYERNAME + "</b>"
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
