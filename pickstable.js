function init() {
  pt.innerHTML = null
  getPlayers()
}

init()

function getPlayers() {
  fetch(
    "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PLAYERS",
  )
    .then(function (players) {
      return players.json()
    })
    .then(function (players) {
      console.log(players)
      players = players.filter(function(player) {
      	return player.ACTIVE
      })
      players = players.sort(function (a, b) {
        return a.PICKORDER - b.PICKORDER
      })
      getDrivers(players)
    })
}

function getDrivers(players) {
  fetch(
    "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?DRIVERS",
  )
    .then(function (drivers) {
      return drivers.json()
    })
    .then(function (drivers) {
      console.log(drivers)
      drivers = drivers.filter(function(driver) {
      	return !driver.PLAYERID
      })
      drivers.push({
    "POS": 12.5,
    "DRIVERID": 0,
    "FIRSTNAME": "",
    "LASTNAME": "",
    "CARNO": "000",
    "PLAYERID": "",
    "PLAYERNAME": "",
    "DRIVERNAME": "--------------"
})
drivers.sort(function(a, b) {
	return a.POS - b.POS
})
      makeTable(players, drivers)
    })
}

function makeTable(players, drivers) {
  players.forEach(function (player) {
    var tr = pt.insertRow()
    var td0 = tr.insertCell()
    td0.innerHTML = player.NAME + "<small> (" + Math.round(player.PICKORDER) + ")</small>"
    var td1 = tr.insertCell()
    player.PICKS = player.PICKS.split(",")
    player.PICKS.length = 2
    player.DRIVERS = player.DRIVERS.split(",")
    player.DRIVERS.length = 2
    for (let i = 0; i < 2; i++) {
      if (player.DRIVERS[i]) {
        var c = document.createElement("DIV")
        c.innerText = player.DRIVERS[i]
        td1.append(c)
      } else {
        var select = document.createElement("SELECT")
        var option = document.createElement("OPTION")
        option.selected = true
        select.add(option)
        drivers.forEach(function (driver) {
          var opt = document.createElement("OPTION")
          opt.text = driver.DRIVERNAME
          opt.value = driver.DRIVERID
          select.add(opt)
        })
      td1.append(select)
      }
    	
    }

  })
}
