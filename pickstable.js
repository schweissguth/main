function makeObj(contents) {
  contents = contents.split('"table":')[1]
  contents = contents.split("});")[0]
  contents = JSON.parse(contents)

  const arr = []
  contents.rows.forEach(function(item, i) {
    var obj = {}
    item.c.forEach(function(jtem, j) {
      var val = ""
      try {
        val = jtem.f
        val = jtem.v
      } catch(err) {
        val = ""
      }
      obj[contents.cols[j].label] = val
    })
    arr.push(obj)
  })
  return arr
}


function picksTable() {
  fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=INFO&tqx=out:json&tq=SELECT A, B").then(result => result.text()).then(function(result) {
  	result = makeObj(result)
    var PREVRACE = 0
    var RACENO = 0
    var RESULTS = []
    var STAGES = []
    var PLAYERS = []
    var PICKS = []
    var STANDINGS = []
    PREVRACE = result[1].VALUE
    RACENO = result[0].VALUE
    //console.log(RACENO)
    getPlayers()


    function getPlayers() {
      fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKORDER&tqx=out:json&tq=SELECT A, B, C order by B").then(res => res.text()).then(function(res) {
      	res = makeObj(res)
        PLAYERS = res
        //console.log("raw players", PLAYERS)
        getPicks()
      })

    }


    function getPicks() {
      fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKS&tqx=out:json&tq=SELECT * where B = " + RACENO + " order by A DESC").then(res => res.text()).then(function(res) {
        PICKS = makeObj(res)
        console.log("PICKS", PICKS)
        getDrivers()
      })

    }
    
    


    function getDrivers() {
      fetch("https://cf.nascar.com/live/feeds/series_1/" + PREVRACE + "/live_points.json").then(res => res.json()).then(function(res) {
      RESULTS = res
      //console.log("raw RESULTS", RESULTS)
      console.log("PICKS IN DRIERS", PICKS)
      RESULTS.map(driver => {
      	driver.driver_fullname = driver.first_name + " " + driver.last_name
      	var find = PICKS.find(function(pick) {
        	return pick.DRIVERID == driver.driver_id
        }) || {PLAYER: "", PLAYERID: ""}
        driver.PLAYER = find.PLAYER
        driver.PLAYERID = find.PLAYERID
      })
      console.log("mapped results", RESULTS)
      mapPicks()
      	
      })

    }
    
    fetch("")


    function mapPicks() {
      PLAYERS.map(function(atem) {
      	var filter = RESULTS.filter(function(jtem) {
        	return jtem.PLAYERID == atem.ID
        })
        atem.PICKS = filter
        

      })
      console.log("PLAYERS", PLAYERS)
      altDrivers()
    }
    
    
    function altDrivers() {
    fetch("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=DRIVERS&tqx=out:json&tq=SELECT A, B, C").then(function(alts) {
    	return alts.text()
    }).then(function(alts) {
    	alts = makeObj(alts)
    	console.log(alts)
      alts.forEach(function(item) {
      	var find = RESULTS.find(function(jtem) {
        	return jtem.driver_id == item.ID
        })
        find.driver_id = item.DRIVERID
        find.driver_fullname = item.DRIVERNAME
      })
      //console.log("RESULTS AFTER ALT", RESULTS)
      makeTable()
    })
    }





    function makeTable() {
    //console.log("make table players", PLAYERS)
    	pt.innerHTML = null;
      PLAYERS.forEach(function(item) {
        var tr = pt.insertRow()
        tr.insertCell().innerHTML = "<b>" + item.PLAYER + "</b><br><small>(" + parseFloat(item.TOTAL).toFixed(0) + ")</small>"
        var td = tr.insertCell()
        item.PICKS.forEach(function(jtem) {
        	try {
          var p = document.createElement("DIV")
          p.innerHTML = jtem.driver_fullname
          td.append(p)
          } catch(err) {
          }
        })
      })
    }


  })

}

picksTable()
