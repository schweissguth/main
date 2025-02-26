
function flagData() {

fetch("https://cf.nascar.com/cacher/live/live-feed.json").then(res => res.json()).then(function(res) {
	//console.log(res)
var flag = document.getElementById("pflag")
      switch (res.flag_state) {
        case 8:
          flag.innerHTML = "<big>🏴 black</big>"
          break;
        case 1:
          flag.innerHTML = "<big>🟢 green</big>"
          break;
        case 2:
          flag.innerHTML = "<big>🟡 caution</big>"
          break;
        case 4:
          flag.innerHTML = "<big>🏁 checkered</big>"
          break;
        case 9:
          flag.innerHTML = "<big>🏁</big>"
          break;
      }
      
      pstage.innerHTML = "Stage " + res.stage.stage_num
      plaps.innerHTML = res.laps_to_go + " laps to go"
      ptrack.innerHTML = res.track_name
			getTV(res.race_id)
})

}

flagData()

setInterval(function(){
  flagData()
}, 30000)


function getTV(raceid) {
	fetch("https://cf.nascar.com/cacher/2025/race_list_basic.json").then(function(res) {
  	return res.json()
  }).then(function(schedules) {
  	schedules = schedules.series_1
  	console.log(schedules)
    var find = schedules.find(function(schedule) {
    	return schedule.race_id == raceid
    })
    pdate.innerHTML = new Date(find.date_scheduled).toLocaleTimeString().replace(":00 PM", " PM")
    ptv.innerHTML = find.television_broadcaster
    pradio.innerHTML = find.radio_broadcaster
    
  })
}
