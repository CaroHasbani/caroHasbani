function loadContent(containerId, filePath) {
    var container = document.getElementById(containerId);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            container.innerHTML = xhr.responseText;
            loadStyles(filePath.replace(".html", ".css"));
        }
    };
    xhr.open("GET", filePath, true);
    xhr.send();
}

function loadStyles(stylePath) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = stylePath;
    document.head.appendChild(link);
}

window.addEventListener("load", function() {
    var loader = document.getElementById("loader-wrapper");
    loader.style.display = "none";
  });
  
