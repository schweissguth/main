var RACEID = 0
var PREVRACE = 0
var PLAYERS = []

function getRaceId() {
  fetch(
    "https://script.google.com/macros/s/AKfycbzbY9NDapp1MxzkVxDR9XI6uj-TnDwnkZMupshwY7M3uOl8uyaJrBYCzYY5au9XdobO/exec?sheet=PLAYERS&ACTIVE=1",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      console.log(res)
      res.sort(function (a, b) {
        return a.PICKORDER - b.PICKORDER
      })
      table.innerHTML = null
      PREVRACE = res[0].PREVRACE
      RACEID = res[0].RACENO
      PLAYERS = res
      getDrivers(res)
    })
}

getRaceId()

function getDrivers(players) {

  fetch(
    "https://cf.nascar.com/live/feeds/series_1/" +
      PREVRACE +
      "/live_points.json",
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      pt.innerHTML = null
      res.splice(13, 0, {
      	driver_id: "9999",
        first_name: "",
        last_name: ""
      })
      players.forEach(function(player) {
      	player.PICKS = player.PICKS.split(",")
        player.PICKS.length = 2
        res = res.map(function(driver) {
        	player.PICKS.forEach(function(pick) {
          	if (pick == driver.driver_id) {
            	console.log("found")
            	driver.membership_id = "disabled"
            }
          })
          return driver
        })
      })
      console.log(res)
    	players.forEach(function(player) {
      	var tr = pt.insertRow()
        tr.insertCell().innerText = player.NAME
        var td1 = tr.insertCell()
        
        var sel1 = document.createElement("SELECT")
        var opt1 = document.createElement("OPTION")
        sel1.append(opt1)
        res.forEach(function(driver, i) {
        	var opt = document.createElement("OPTION")
          opt.value = driver.driver_id
          opt.text = driver.first_name + " " + driver.last_name
          opt[driver.membership_id] = true
          if (player.PICKS[0] == driver.driver_id) {
          	opt.selected = true
            //driver.membership_id = "disabled"
            //res.splice(i, 1)
            //player.PICKS.shift()
          }
          sel1.append(opt)
        })
        td1.append(sel1)
        var td2 = tr.insertCell()
        var sel2 = document.createElement("SELECT")
        var opt2 = document.createElement("OPTION")
        sel2.append(opt2)
        res.forEach(function(driver, i) {
        	var opt = document.createElement("OPTION")
          opt.value = driver.driver_id
          opt.text = driver.first_name + " " + driver.last_name
          opt[driver.membership_id] = true
          if (player.PICKS[1] == driver.driver_id) {
          	opt.selected = true
            //driver.membership_id = "disabled"
            //res.splice(i, 1)
            //player.PICKS.shift()
          }
          sel2.append(opt)
        })
        td1.append(sel2)
      })
    })
}
