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
          let reposOutlineClone = document
            .getElementById("repos-outline")
            .cloneNode(true);
          reposOutlineClone.querySelector(".box-body").textContent =
            data[i]["name"];
          listOfRepos += reposOutlineClone.innerHTML;
        }
        document
          .getElementById("repos")
          .querySelector(".columns").innerHTML = listOfRepos;
      });
  });
