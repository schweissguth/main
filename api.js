fetch("https://cf.nascar.com/cacher/2026/1/race_list_basic.json").then(function(res) {
  return res.json()
}).then(function(res) {
  return res
})
