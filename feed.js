var raceno = 0

fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(res => res.json()).then(function(res) {
	console.log(res)
  raceno = res.race_id
  //raceno = 5275
      getRace()
})

function getRace() {
fetch("https://cf.nascar.com/cacher/2023/1/" + raceno + "/lap-notes.json").then(function (item) {
        return item.json()
      }).then(function (item) {
        console.log(item.laps)
            tfeed.innerHTML = null

        for (var i in item.laps) {
          item.laps[i].forEach(function (jtem) {
            var tr = tfeed.insertRow(0)
            tr.insertCell().innerHTML = i
            tr.insertCell().innerHTML = jtem.Note
            
          })

        }
      })
    
}