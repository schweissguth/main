

function getLiveRace() {
	fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(function(res) {
  	return res.json()
  }).then(function(feeds) {
  	//console.log(feeds)
    getDriverPicks(feeds)
  })
}
getLiveRace()

function getDriverPicks(feeds) {
	fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?DRIVERS").then(function(res) {
  	return res.json()
  }).then(function(drivers) {
  	console.log(drivers)
    feeds = feeds.vehicles.map(function(feed) {
    	var find = drivers.find(function(driver) {
      	return driver.DRIVERID == feed.driver.driver_id
      }) || {
      	PLAYERID: null
      }
      feed.PLAYERID = find.PLAYERID
      return feed
    })
    console.log(feeds)
    feeds = feeds.filter(function(feed) {
    	return feed.PLAYERID
    })
    var count = 1
    feeds.reverse()
    feeds = feeds.map(function(feed) {
    	feed.RANK = count++
      return feed
    })
    feeds.reverse()
    getPlayerPicks(feeds)
  })
}



function getPlayerPicks(feeds) {
	fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PLAYERS").then(function(players) {
  	return players.json()
  }).then(function(players) {
  	console.log(players)
    players = players.map(function(player) {
    	player.RUNORDER = []
    	player.RANK = []
    	player.SUM = 0
      player.PICKS = player.PICKS.split(",")
      player.PICKS.forEach(function(pick) {
      	var find = feeds.find(function(feed) {
        	return feed.driver.driver_id == pick
        }) || {
        	running_position: 0,
          RANK: 0
        }
        player.RUNORDER.push(find.running_position)
        player.RANK.push(find.RANK)
        player.SUM += find.RANK
      })
      return player
    })
    makePicksTable(players)
  })
}


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
    tr.insertCell().innerText = player.NAME
    player.DRIVERS = player.DRIVERS.split(",")
    var td1 = tr.insertCell()
    player.DRIVERS.forEach(function(driver) {
    	var div = document.createElement("DIV")
      div.innerText = driver
      td1.append(div)
    })
    tr.insertCell().innerHTML = "<b>" + player.SUM + "</b>"
    
  })
}
