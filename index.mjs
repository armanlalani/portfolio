// Add an event listener on resize event
// add a throttled callback to this resize event
// On <767px, add an event listener on extended header
// Remove it when >767px
// maintain a state to know whether event is attached or not

// function throttle(fn, delay = 100) {
//   let isSleeping = false;
//   let stash = null;

//   function wakeUp() {
//     setTimeout(() => {
//       isSleeping = false;
//       if (stash) {
//         fn.call(stash[0], stash[1]);
//         stash = null;
//         isSleeping = true;
//         wakeUp();
//       }
//     }, delay);
//   }

//   return function (...params) {
//     if (isSleeping) {
//       stash = [this, params];
//     } else {
//       fn.call(this, ...params);
//       isSleeping = true;
//       wakeUp();
//     }
//   };
// }

// const handleResize = (e) => {
//   console.log(e.target.innerWidth);
//   let currWidth = e.target.innerWidth;
//   if (currWidth < 767) {
//     // Add an event listener to menu button
//   }
// };

// window.addEventListener("resize", throttle(handleResize, 300));

const MENU_BUTTON_CLASS = ".menu-button";
const MENU_OPEN_ICON_CLASS = ".open-icon";
const MENU_CLOSE_ICON_CLASS = ".close-icon";
const EXTENDED_HEADER_CLASS = ".extended-header";

const menu = document.querySelector(MENU_BUTTON_CLASS);
const menuCloseIcon = menu.querySelector(MENU_CLOSE_ICON_CLASS);
const menuOpenIcon = menu.querySelector(MENU_OPEN_ICON_CLASS);
const extendedHeader = document.querySelector(EXTENDED_HEADER_CLASS);

document.querySelectorAll;

let menuOpen = false;

menuCloseIcon.style.display = "none";
extendedHeader.classList.add("hidden-flex");

menu.addEventListener("click", () => {
  console.log("click");
  if (menuOpen) {
    // To close the menu
    menuCloseIcon.style.display = "none";
    menuOpenIcon.style.display = "block";
    // extendedHeader.classList.toggle("visible-flex");
    extendedHeader.classList.toggle("hidden-flex");
  } else {
    menuCloseIcon.style.display = "block";
    menuOpenIcon.style.display = "none";
    // extendedHeader.classList.toggle("visible-flex");
    extendedHeader.classList.toggle("hidden-flex");
  }

  menuOpen = !menuOpen;
});
