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
  

// Cargar el Navbar y el Page Header
loadContent("navbarContainer", "navbar.html");
loadContent("pageHeaderContainer", "page-header.html");

// function loadContent(containerId, filePath, title, backgroundImage) {
//     var container = document.getElementById(containerId);
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             container.innerHTML = xhr.responseText;
//             loadStyles(filePath.replace(".html", ".css"));
//             updatePageHeader(title, backgroundImage);
//         }
//     };
//     xhr.open("GET", filePath, true);
//     xhr.send();
// }

// function loadStyles(stylePath) {
//     var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.type = "text/css";
//     link.href = stylePath;
//     document.head.appendChild(link);
// }

// function updatePageHeader(title, backgroundImage) {
//     var pageHeader = document.querySelector('.page-header');
//     var pageTitle = pageHeader.querySelector('.title');
//     var pageHeaderImage = pageHeader.querySelector('.page-header-image');

//     // Actualizar el título
//     pageTitle.innerText = title;

//     // Actualizar la imagen de fondo
//     pageHeaderImage.style.backgroundImage = 'url("' + backgroundImage + '")';
// }

// // Cargar el Navbar y el Page Header
// loadContent("navbarContainer", "navbar.html", "", "");
// loadContent("pageHeaderContainer", "page-header.html", pageTitle, pageHeaderImage);
