window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos == 0) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-116px";
  }
};

Array.prototype.slice
  .call(document.getElementById("navbar").getElementsByTagName("a"))
  .forEach(function (item, index) {
    item.addEventListener("click", function () {
      let scrollTo = document.getElementById(item.getAttribute("goTo"));
      scrollTo.scrollIntoView();
    });
  });

fetch("https://api.github.com/users/aashishtuladhar")
  .then((response) => response.json())
  .then(function (data) {
    let listOfRepos = "";
    fetch(data["repos_url"])
      .then((response) => response.json())
      .then(function (data) {
        for (i = 0; i < data.length; i++) {
          if (data[i]["name"] != "aashishtuladhar.github.io") {
            let reposOutlineClone = document
              .getElementById("repos-outline")
              .cloneNode(true);
            reposOutlineClone
              .querySelector(".box-body")
              .setAttribute("repositoryUrl", data[i]["html_url"]);
            reposOutlineClone.querySelector(
              ".box-body .repos-title"
            ).textContent = data[i]["name"];
            reposOutlineClone.querySelector(".box-body p").textContent =
              data[i]["description"];
            reposOutlineClone.querySelector(".repos-issues span").textContent =
              data[i]["open_issues_count"];
            reposOutlineClone.querySelector(
              ".repos-watchers span"
            ).textContent = data[i]["watchers"];

            listOfRepos += reposOutlineClone.innerHTML;
          }
        }
        document
          .getElementById("repos")
          .querySelector(".columns").innerHTML = listOfRepos;
      });
  });

function repoMouseOver(currentElement) {
  currentElement.classList.add("hover");
}

function repoMouseOut(currentElement) {
  currentElement.classList.remove("hover");
}

function goToRepositoryUrl(currentElement) {
  window.open(currentElement.getAttribute("repositoryUrl"), "_blank");
}
