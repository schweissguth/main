function getStandings() {
  fetch(
    "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?STANDINGS",
  )
    .then(function (standings) {
      return standings.json()
    })
    .then(function (standings) {
      //console.log(standings)
      getPlayers(standings)
    })
}

getStandings()

function getPlayers(standings) {
  fetch(
    "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PLAYERS",
  )
    .then(function (players) {
      return players.json()
    })
    .then(function (players) {
      //console.log(players)
      table.innerHTML = null
      standings.forEach(function (standing) {
        var tr = table.insertRow()
        var td0 = tr.insertCell().id = standing.driver_id
        tr.insertCell().innerText =
          standing.first_name + " " + standing.last_name
        var td = tr.insertCell()
        var select = document.createElement("SELECT")
        var option = document.createElement("OPTION")
        select.add(option)
        players.forEach(function (player) {
          var opt = document.createElement("OPTION")
          opt.text = player.NAME
          opt.value = player.ID
          select.add(opt)
        })
        select.onchange = function() {
        	fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PICKS", {
          	method: "post",
            body: JSON.stringify({
            	DRIVERID: standing.driver_id,
              PLAYERID: this.value
            })
          })
        }
        select.value = standing.PLAYERID
        td.append(select)
      })
      var td13 = table.insertRow(13).insertCell()
      td13.setAttribute("colspan", 3)
      td13.innerHTML = "<hr>"
      getImages()
    })
}

function getImages() {
  fetch("https://cf.nascar.com/cacher/drivers.json")
    .then(function (res) {
      return res.json()
    })
    .then(function (images) {
      images.response.forEach(function (image) {
        try {
          var td = document.getElementById(image.Nascar_Driver_ID)
          td.innerHTML =
            "<img src='" + image.Image_Small + "' width='50' />"
        } catch (err) {}
      })
    })
}
