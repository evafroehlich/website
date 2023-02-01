(() => {
  const normal = document.getElementById("nav-menu");
  const reverse = document.getElementById("nav-menu-left");

  const icon = normal !== null ? normal : reverse;

  // Toggle the "menu-open" % "menu-opn-left" classes
  function toggle() {
    const navRight = document.getElementById("nav");
    const navLeft = document.getElementById("nav-left");
    const nav = navRight !== null ? navRight : navLeft;
    const button = document.getElementById("menu");
    const site = document.getElementById("wrap");

    if (!nav || !button || !site) {
      return;
    }

    if (nav.className == "menu-open" || nav.className == "menu-open-left") {
      nav.className = "";
      button.className = "";
      site.className = "";
    } else if (reverse !== null) {
      nav.className += "menu-open-left";
      button.className += "btn-close";
      site.className += "fixed";
    } else {
      nav.className += "menu-open";
      button.className += "btn-close";
      site.className += "fixed";
    }
  }

  // Ensures backward compatibility with IE old versions
  function menuClick() {
    if (typeof document.addEventListener == "function" && icon !== null) {
      icon.addEventListener("click", toggle);
      // @ts-ignore
    } else if (typeof document?.attachEvent == "function" && icon !== null) {
      // @ts-ignore
      icon.attachEvent("onclick", toggle);
    } else {
      return;
    }
  }

  menuClick();

  const teasers = document.querySelectorAll(".experience__teaser");
  for (let i = 0; i < teasers.length; i++) {
    teasers[i].addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("experience__description--open");
    });
  }
})();
