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
	DRIVERS.forEach(function(item) {
  	var tr = tbody.insertRow()
    
    var tdimg = tr.insertCell()
    var img = document.createElement("IMG")
    img.src = item.IMAGE
    img.style.width = "50px"
    tdimg.append(img)
    
    tr.insertCell().innerHTML = item.first_name + " " + item.last_name
    
    var td = tr.insertCell()
    
    var form = document.createElement("form")
    td.append(form)
    form.action = "https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec"
    form.method = "get"
    form.target = "iframe"
    form.id = "form"
    
    var iframe = document.createElement("iframe")
    iframe.name = "iframe"
    iframe.style.display = "none"
    form.append(iframe)
    
    var inpage = document.createElement("input")
    inpage.name = "page"
    inpage.value = "picksubmit"
    inpage.type = "hidden"
    form.append(inpage)
    
    var inp = document.createElement("input")
    inp.name = "driverid"
    inp.value = item.driver_id
    inp.type = "hidden"
    form.append(inp)
    
    var inprid = document.createElement("input")
    inprid.name = "raceid"
    inprid.value = item.RACEID
    inprid.type = "hidden"
    form.append(inprid)
    
    var select = document.createElement("select")
    select.name = "playerid"
    select.onchange = function() {
    	form.submit()
    }
    var option = document.createElement("option")
    select.append(option)
    
    PLAYERS.forEach(function(player) {
    	var opt = document.createElement("OPTION")
      opt.text = player.NAME
      opt.value = player.ID
      select.append(opt)
    })
    form.append(select)
    select.value = item.PLAYERID
    
  })
var tr = tbody.insertRow(12)
  tr.insertCell()
  tr.insertCell()
  tr.insertCell()
}
