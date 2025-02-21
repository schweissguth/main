fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/values/DRIVERS?key=AIzaSyDIEdL4EcBenrWDkh03oFYmFvHT_VNH3AI",
)
  .then(function (res) {
    return res.json()
  })
  .then(function (standings) {
    standings = standings.values.makeObj()
    getPlayers(standings)
  })

function getPlayers(standings) {
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
      standings.forEach(function (standing) {
        var tr = table.insertRow()
        tr.insertCell().id = standing.driver_id
        tr.insertCell().innerText = standing.DRIVERNAME
        var td = tr.insertCell()
        var select = document.createElement("SELECT")
        var option = document.createElement("OPTION")
        select.add(option)
        td.append(select)
        players.forEach(function (player) {
          var opt = document.createElement("OPTION")
          opt.text = player.PLAYERNAME
          opt.value = player.PLAYERID
          select.add(opt)
        })
        select.onchange = function () {
          fetch(
            "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?PICKS",
            {
              method: "post",
              body: JSON.stringify({
                DRIVERID: standing.driver_id,
                PLAYERID: this.value,
                DRIVERNAME: standing.first_name + " " + standing.last_name,
              }),
            },
          )
        }
        select.value = standing.PLAYERID
      })
      getImages()
      var tr = table.insertRow(standings[0].CUTOFF)
      var td = tr.insertCell()
      td.setAttribute("colspan", 3)
      td.innerHTML = "<hr>"
    })
}

function getImages() {
  fetch("https://cf.nascar.com/cacher/drivers.json")
    .then(function (res) {
      return res.json()
    })
    .then(function (images) {
      console.log(images)
      images = images.response
      images.forEach(function (image) {
        try {
          var td = document.getElementById(image.Nascar_Driver_ID)
          td.innerHTML = "<img src='" + image.Badge_Image + "' width='50' />"
        } catch (err) {}
      })
    })
}
