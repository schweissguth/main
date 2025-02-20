

function getLiveRace() {
	fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(function(res) {
  	return res.json()
  }).then(function(feeds) {
  	tlive.innerHTML = null
  	console.log(feeds)
    getLiveDrivers(feeds)
  })
}

getLiveRace()


function getLiveDrivers(feeds) {
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
    makeLiveTable(feeds)
  })
}


function makeLiveTable(feeds) {
	feeds.vehicles.forEach(function(feed) {
  	var tr = tlive.insertRow()
    tr.insertCell().innerText = feed.running_position + " "
    tr.insertCell().innerHTML = feed.driver.full_name + " " + "<i><small>-" + Math.round(feed.delta * 100)/100 + "</small></i>"
    tr.insertCell().innerHTML = "<b>" + feed.PLAYERNAME + "</b>"
  })
  
}
