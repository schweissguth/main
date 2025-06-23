getRunningorder().then(function (runningorder) {
  runningorder.vehicles.forEach(function (feed) {
    var tr = tlive.insertRow()
    tr.insertCell().innerText = feed.running_position + " "
    tr.insertCell().innerHTML =
      feed.driver.full_name +
      " " +
      "<i><small>-" +
      Math.round(feed.delta * 100) / 100 +
      "</small></i>"
    tr.insertCell().innerHTML =
      "<b>" +
      (feed.player.name || "") +
      "</b>" +
      " <i><small>" +
      (feed.pts || "") +
      "</small></i>"
  })
})
