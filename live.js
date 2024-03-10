function getLiveRace() {
  fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?page=liverace").then(function(res) {
    return res.json()
  }).then(function(res) {
    //console.log(res)
    tlive.innerHTML = ""
    res.vehicles.forEach(function(item, index) {
      item.delta = parseFloat(item.delta).toFixed(2)
      if (index == 0) {
        item.delta = ""

      }
      var tr = tlive.insertRow()
      tr.insertCell().innerHTML = index + 1
      tr.insertCell().innerHTML = item.driver.full_name + "<small> " + item.delta +"</small>"
      if (item.PTS > 0) {
      tr.insertCell().innerHTML = item.PTS
      } else {
      tr.insertCell().innerHTML = ""
        
      }
      tr.insertCell().innerHTML = "<b>" + item.PLAYER + "</b>"
    })
  })
}

getLiveRace()


setInterval(function(){
  getLiveRace()
}, 30000)
