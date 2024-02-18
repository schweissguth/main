      fetch("https://cf.nascar.com/cacher/2023/1/" + 5275 + "/lap-notes.json").then(function (item) {
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
    
