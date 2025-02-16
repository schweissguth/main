

function getLiveRace() {
	fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(function(res) {
  	return res.json()
  }).then(function(feeds) {
  	tlive.innerHTML = null
  	console.log(feeds)
    getDrivers(feeds)
  })
}

getLiveRace()


function getDrivers(feeds) {
	fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?DRIVERS").then(function(drivers) {
  	return drivers.json()
  }).then(function(drivers) {
  	console.log(drivers)
    feeds.vehicles = feeds.vehicles.map(function(feed) {
    	var find = drivers.find(function(driver) {
      	return feed.driver.driver_id == driver.DRIVERID
      }) || {
      	PLAYERNAME: ""
      }
      feed.PLAYERNAME = find.PLAYERNAME
      return feed
    })
    makeTable(feeds)
  })
}


function makeTable(feeds) {
	feeds.vehicles.forEach(function(feed) {
  	var tr = tlive.insertRow()
    tr.insertCell().innerText = feed.running_position
    tr.insertCell().innerText = feed.driver.full_name
    tr.insertCell().innerHTML = feed.PLAYERNAME
  })
}
