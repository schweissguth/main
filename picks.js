var DRIVERS = []
var PLAYERS = []

fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?page=picks").then(function(res) {
	return res.json()
}).then(function(res) {
	console.log(res)
  DRIVERS = res.standings
  PLAYERS = res.players
  makeTable()
})




function makeTable() {
	tbody.innerHTML = null
	DRIVERS.forEach(function(item) {
  	var tr = tbody.insertRow()
    
    var tdimg = tr.insertCell()
    var img = document.createElement("IMG")
    img.src = item.IMAGE
    img.style.width = "50px"
    tdimg.append(img)
    
    tr.insertCell().innerHTML = item.first_name + " " + item.last_name
    
    var td = tr.insertCell()
    
    var select = document.createElement("SELECT")
    var option = document.createElement("OPTION")
    select.append(option)
    
    PLAYERS.forEach(function(player) {
    	var opt = document.createElement("OPTION")
      opt.text = player.NAME
      opt.value = player.ID
      select.append(opt)
    })
    
    select.onchange = function() {
    	fetch("https://script.google.com/macros/s/AKfycbwyx5JZpneWX4L_GyEike2Z8Bqjmgy-8qrNOTVORBSi1ErN6AWO7E8rNM8HIc5bS2nW/exec?PICKS", {
      	method: "post",
        body: JSON.stringify({
          DRIVERID: item.driver_id,
          PLAYERID: this.value,
        })
      })
    }
    select.value = item.PLAYERID
    td.append(select)
    
    
 
    
  })
var tr = tbody.insertRow(13)
  var td = tr.insertCell()
	td.setAttribute("colspan", "3")
	td.innerHTML = "<hr>"
}
