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
      var scrollTo = document.getElementById(item.getAttribute("goTo"));
      scrollTo.scrollIntoView();
    });
  });
