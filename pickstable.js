

fetch("https://script.google.com/macros/s/AKfycbyEGYd3C0Zgd-mHbBrjDrdMUSsYvj_7oky1yIuffDrRk8rURlR-gV_IteIJHzznntfO/exec?page=pickstable").then(function(res) {
	return res.json()
}).then(function(res) {
	console.log(res)
	tpicks.innerHTML = null;
	res.forEach(function(item) {
  	var tr = tpicks.insertRow()
    tr.insertCell().innerHTML = "<b>" + item.PLAYER + "</b>" + " <small> (" + item.PTS + ") </small>"
    tr.insertCell().innerHTML = item.DRIVER1
    tr.insertCell().innerHTML = item.DRIVER2
  })
})
