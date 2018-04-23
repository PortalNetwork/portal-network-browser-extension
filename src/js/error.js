import "../html/error.html";
import "../css/error.css";
var injectName = () => {
  let index = location.href.lastIndexOf("?name=")
  let name = location.href.slice(index + 6)
  document.getElementById("name").innerHTML = name
}

injectName()
