getRunningorder().then(function (runningorder) {
  tlive.innerHTML = null
  runningorder.vehicles.forEach(function (feed) {
    var tr = tlive.insertRow()
    tr.insertCell().innerText = feed.running_position + " "
    tr.insertCell().innerHTML =
      feed.driver.full_name +
      " " +
      "<i><small>-" +
      feed.delta.toFixed(2) +
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
