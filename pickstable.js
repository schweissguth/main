



function getPlayers(feeds) {
	fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PLAYERS").then(function(players) {
  	return players.json()
  }).then(function(players) {
  	console.log(players)
    players = players.filter(function(player) {
    	return player.ACTIVE
    })
    makePicksTable(players)
  })
}

getPlayers()


function makePicksTable(players) {
  	pt.innerHTML = null
	players.sort(function(a, b) {
  	return a.PICKORDER - b.PICKORDER
  })
  players = players.filter(function(player) {
  	return player.ACTIVE
  })
	console.log(players)
  players.forEach(function(player) {
  	var tr = pt.insertRow()
    tr.insertCell().innerText = player.PLAYERNAME
    var td = tr.insertCell()
    td.innerHTML = "<div>" + player.DRIVERNAME1 + "</div>"
    td.innerHTML += "<div>" + player.DRIVERNAME2 + "</div>"
  })
}
