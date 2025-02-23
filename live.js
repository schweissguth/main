function getLiveRace() {
  fetch("https://cf.nascar.com/cacher/live/live-feed.json")
    .then(function (res) {
      return res.json()
    })
    .then(function (feeds) {
      tlive.innerHTML = null
      console.log(feeds)
      getLiveDrivers(feeds)
    })
}

getLiveRace()

function getLiveDrivers(feeds) {
  fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/DRIVERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
  )
    .then(function (drivers) {
      return drivers.json()
    })
    .then(function (drivers) {
      drivers = drivers.values.makeObj()
      console.log(drivers)
      feeds.vehicles = feeds.vehicles.map(function(feed) {
      	feed.PLAYERNAME = ""
        return feed
      })
      drivers.forEach(function (driver) {
        var find = feeds.vehicles.find(function (feed) {
          return feed.driver.driver_id == driver.driver_id
        })
        if (find) {
          find.PLAYERNAME = driver.PLAYERNAME
        }
      })
      makeLiveTable(feeds)
    })
}

function makeLiveTable(feeds) {
  feeds.vehicles.forEach(function (feed) {
    var tr = tlive.insertRow()
    tr.insertCell().innerText = feed.running_position + " "
    tr.insertCell().innerHTML =
      feed.driver.full_name +
      " " +
      "<i><small>-" +
      Math.round(feed.delta * 100) / 100 +
      "</small></i>"
    tr.insertCell().innerHTML = "<b>" + feed.PLAYERNAME + "</b>"
  })
}
