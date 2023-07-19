var BODY = document.getElementsByTagName("body")[0]
var FORM = document.createElement("FORM")
var INP = document.createElement("INPUT")
var TA = document.createElement("TEXTAREA")
FORM.action = "https://script.google.com/macros/s/AKfycbz50tMk3i2Z_98fqIl7D4PUxPXL_P9vmqjIJivMoQSCf2ufMn1nsK-hGSBJdTFGjNre/exec"
FORM.method = "post"
INP.value = "A"
INP.name = "col"
TA.value = "wanrdy hachoowy"
TA.name = "str"
FORM.append(INP)
FORM.append(TA)
BODY.append(FORM)
FORM.submit()
