//
// Show/hide some sections by clicking on the title.
//
// Can be replaced by <details>, <summary> once it is supported by most browsers.
//

function saveStatus(id, shown) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("yfold-shown-" + id, shown);
  }
}

// record : (when clicked), record the status in local storage
function setStatus(id, shown, content, record) {

  // console.log ("setStatus (" + id + ", " + shown + ")") ;

  var span = document.getElementById("arrow-" + id);

  if (shown) {
    content.classList.remove("anim-hide");
    content.classList.remove("hidden");
    span.innerHTML = "&#x25be;";
    if (record) {
      content.classList.add("anim-show");
    } else {
      content.classList.add("shown");
    }
  } else {
    content.classList.remove("anim-show");
    content.classList.remove("shown");
    span.innerHTML = "&#x25b8;";
    if (record) {
      content.classList.add("anim-hide");
    } else {
      content.classList.add("hidden");
    }
  }

  if (record) {
    saveStatus(id, shown);
  }
}

// Invoked at load-time once for every yfold section.
function initYfold(id) {

  // console.log ("initYfold (" + id + ")") ;

  // console.log ("unknown " + id)
  var shown = true;
  var content = document.getElementById("content-" + id);

  // Sets the state according to local storage or default value.

  if (typeof(Storage) !== "undefined") {
    var local = localStorage.getItem("yfold-shown-" + id);
    // console.log ("using storage value = " + local)

    if (local === 'true') {
      shown = true;
    } else if (local === 'false') {
      shown = false;
    } else {
      // Get default value
      var defv = content.getAttribute("data-yfold-default");
      if (defv === 'hide') {
        shown = false;
      }
      // console.log ("using default value = " + shown)
    }
  }

  setStatus(id, shown, content, false);
}

// Function invoked when the title is clicked.
function toggleYfold(id) {

  // console.log ("toggleYfold (" + id + ")") ;

  var content = document.getElementById("content-" + id);
  var expand = content.classList.contains("anim-hide") || content.classList.contains("hidden");
  setStatus(id, expand, content, true);
}

/*********************************

 Du js pour les codes snippets !
 - theme sombre/clair
 - copier le texte

**********************************/

window.onload = function() {
  console.log("DOM loaded.")
  var snippet = document.getElementsByTagName("code")[0];
  if ((snippet.classList.value.includes("page")) || (snippet.classList.value.includes("block"))) {
    console.log(snippet);

    let img = document.createElement('div');
    img.innerHTML = '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M407 128H185C153.52 128 128 153.52 128 185V407C128 438.48 153.52 464 185 464H407C438.48 464 464 438.48 464 407V185C464 153.52 438.48 128 407 128Z" stroke="black" stroke-width="32" stroke-linejoin="round"/><path d="M383.5 128L384 104C383.958 89.1609 378.044 74.9416 367.551 64.4487C357.058 53.9558 342.839 48.0422 328 48H112C95.0416 48.0501 78.792 54.8091 66.8005 66.8005C54.8091 78.792 48.0501 95.0416 48 112V328C48.0422 342.839 53.9558 357.058 64.4487 367.551C74.9416 378.044 89.1609 383.958 104 384H128" stroke="black" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    img.addEventListener('click', function() {
      console.log(snippet.innerText);
      navigator.clipboard.writeText(snippet.innerText).then(function() {
        console.log("copié !");
        img.classList = "valid"
      }, function() {
        console.log("pas copié !");
        img.classList = "not-valid"
      });
    });

    let theme = document.createElement('div');
    theme.setAttribute("class", "theme");
    theme.innerHTML = '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M256 464C370.875 464 464 370.875 464 256C464 141.125 370.875 48 256 48C141.125 48 48 141.125 48 256C48 370.875 141.125 464 256 464Z" stroke="black" stroke-width="32" stroke-linejoin="round"/><path d="M256 464C141.12 464 48 370.88 48 256C48 141.12 141.12 48 256 48V464Z" fill="black"/></svg>';

    theme.addEventListener('click', function() {
      snippet.classList.toggle("light");
      console.log("theme switched !");
      if (theme.classList == "theme darken") {
        theme.classList = "theme lighten";
      } else {
        theme.classList = "theme darken";
      }
    });

    snippet.appendChild(img)
    snippet.appendChild(theme)
  } else {
    console.log(snippet.classList);
  }

  if (typeof(Storage) !== "undefined") {
    var theme = localStorage.getItem("theme");
    console.log("theme : " + theme)

    if (theme === "/Y/ystyle.css") {
      css_url = "/Y/ystyle.css";
    } else if (theme === "/Y/ystyle2.css") {
      css_url = "/Y/ystyle2.css";
      changeCSS(css_url, 0)
    } else {
      // Get default value
      css_url = "/Y/ystyle.css";
    }
  }

  var toggler = document.createElement("a")
  toggler.setAttribute("id", "toggler")
  toggler.style.position = "absolute"
  toggler.style.top = "12px"
  toggler.style.right = "12px"
  toggler.style.padding = "10px"
  toggler.style.borderRadius = "7px"
  toggler.style.background = "#335"
  toggler.style.color = "#eee"
  toggler.style.zIndex = "12"
  toggler.innerHTML = "theme"
  toggler.style.cursor = "pointer"
  toggler.addEventListener("click", function() {
    if (css_url == "/Y/ystyle.css") {
      css_url = "/Y/ystyle2.css";
    } else {
      css_url = "/Y/ystyle.css";
    }
    changeCSS(css_url, 0)
  })

  document.body.appendChild(toggler)
}

function changeCSS(css_file, cssLinkIndex) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("theme", css_file);
  }

  console.log("changing css")

  var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", css_file);

  document.getElementsByTagName("head").item(cssLinkIndex).replaceChild(newlink, oldlink);
}
