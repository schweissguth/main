
var RACENO = 0
var RESULTS = []
var STAGES = []
var PLAYERS = []
var PICKS = []


function raceNumber() {
	fetch("https://script.google.com/macros/s/AKfycbzRaoRSjPSsUMnMb5UJNBIXeppcNiASFhy8TPHtt5Vg5JYagnkgRYoMGRVJnZ-Iymkm/exec?fetch=" + encodeURIComponent("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=INFO&tqx=out:json&tq=SELECT A, B")).then(res => res.json()).then(function(res) {
    RACENO = res[0].VALUE
    console.log(RACENO)
    getResults()
  })

}

raceNumber()




function getResults() {
fetch("https://cf.nascar.com/cacher/2024/1/" + RACENO + "/weekend-feed.json").then(function(res) {
  return res.json()
}).then(function(res) {
  RESULTS = res.weekend_race[0].results.filter(item => item.finishing_position > 0)
  console.log("raw results", RESULTS)
  STAGES = res.weekend_race[0].stage_results
  console.log("raw stages", STAGES)
  getPlayers()
});

}




function getPlayers() {
	fetch("https://script.google.com/macros/s/AKfycbzRaoRSjPSsUMnMb5UJNBIXeppcNiASFhy8TPHtt5Vg5JYagnkgRYoMGRVJnZ-Iymkm/exec?fetch=" + encodeURIComponent("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKORDER&tqx=out:json&tq=SELECT A, B, C")).then(res => res.json()).then(function(res) {
    PLAYERS = res
    console.log("raw players", PLAYERS)
    getPicks()
  })

}



function getPicks() {
	fetch("https://script.google.com/macros/s/AKfycbzRaoRSjPSsUMnMb5UJNBIXeppcNiASFhy8TPHtt5Vg5JYagnkgRYoMGRVJnZ-Iymkm/exec?fetch=" + encodeURIComponent("https://docs.google.com/spreadsheets/u/0/d/1jwadkJYYfBmf-SbjUokDV0S_yzC7gD39-jHxVatJfLU/gviz/tq?sheet=PICKS&tqx=out:json&tq=SELECT * where B = " + RACENO + " order by A DESC")).then(res => res.json()).then(function(res) {
    PICKS = res
    console.log("raw picks", PICKS)
    mapPicks()
  })

}


function mapPicks() {
	RESULTS.map(function(atem) {
  	atem.BONUS = 0
  	var find = PICKS.find(function(btem) {
    	return atem.driver_id == btem.DRIVERID
    }) || {
    	PLAYERID: "",
      PLAYER: ""
    }
    Object.assign(atem, find)
    
    if (atem.driver_id == STAGES[0].results[0].driver_id) {
    	atem.BONUS++
    }
    
    if (atem.driver_id == STAGES[1].results[0].driver_id) {
    	atem.BONUS++
    }
    
  })
  
  RESULTS[0].BONUS++
  RESULTS[0].BONUS++
  
  console.log("RESUTS + BONUNS", RESULTS)
  
  RESULTS.reverse()
  var count = 0
  RESULTS.map(function(item) {
  	if (item.PLAYERID) {
    	item.PTS = ++count
    }
  })
  RESULTS.reverse()
  
  mapResults()
}


function mapResults() {
	PLAYERS.map(function(atem) {
  	var filter = RESULTS.filter(function(btem) {
    	return btem.PLAYERID == atem.ID
    }) || [[""], [""]]
    var total = filter.reduce(function(sum, item) {
    	return sum + item.PTS + item.BONUS
    }, 0)
    atem.picks = filter
    atem.TOTAL = total
    
  })
  console.log("map results", PLAYERS)
  makeTable()
  
}


function makeTable() {
	pt.innerHTML = null;
	PLAYERS.forEach(function(item) {
  	var tr = pt.insertRow()
    tr.insertCell().innerHTML = item.PLAYER + " <small>(" + parseFloat(item.TOTAL).toFixed(0) + ")</small>"
    var td = tr.insertCell()
    var t = document.createElement("table")
    td.append(t)
    item.picks.forEach(function(jtem) {
    	var itr = t.insertRow()
      itr.insertCell().innerHTML = jtem.driver_fullname
      itr.insertCell().innerHTML = jtem.finishing_position
      itr.insertCell().innerHTML = jtem.PTS
      var btd = itr.insertCell()
      if (jtem.BONUS > 0) {
      	btd.innerHTML = jtem.BONUS
      }
      
    })
    tr.insertCell().innerHTML = item.TOTAL
  })
}
