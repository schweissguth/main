function getLiveRace() {
  fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?page=liverace").then(function(res) {
    return res.json()
  }).then(function(res) {
    console.log(res)
    tlive.innerHTML = ""
    res.vehicles.forEach(function(item, index) {
    	var tr = tlive.insertRow()
      tr.insertCell().innerHTML = index + 1
      tr.insertCell().innerHTML = item.driver.full_name
      tr.insertCell().innerHTML = item.PTS
      tr.insertCell().innerHTML = item.PLAYER
    })
  })
}

getLiveRace()
