/*
_____________________________________________________________________________________________________
                                            EMAIL BUTTON CONSTANTS
_____________________________________________________________________________________________________
*/

const sendEmailContainer = document.getElementById("send-email-menu");
const sendEmailItems = sendEmailContainer.querySelectorAll(
  ".button-main-menu, .button-Suzanne, .button-David, .button-Sandy, .button-Natalie "
);

currentContainer = sendEmailContainer;
currentItems = sendEmailItems;

/*____________________________________________________________________________________________________________________
            Global Vars
____________________________________________________________________________________________________________________
*/

let singleInputMode = true;
var selectedIndex = -1;
var selectedMenuOrder;
var previousElement;
var previousColor;
var cycleTimeout;
var cycleTime = 500; //2000

/*
--------------------------------------------------
                INITIALIZATION
--------------------------------------------------
*/
function init() {
  eel.loadConfig();
}

function resetMouse(event) {
  if (event != undefined) event.stopPropagation();
  eel.resetMouse();
}

//default to main menu container and items

let rowDict = null;
let currentRows = null;

/*

/*
--------------------------------------------------
        Input Mode Functions
--------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", function () {
  let cycleTimeout;
  let currentIndex = 0;
  let cycling = false;
  // If you set this to 1, it unbreaks everything
  let t2scycle = 2;
  let rowidx = 0;

  const highlightRow = (index) => {
    currentRows.forEach((item) => {
      item.style.boxShadow = ""; // Remove any existing glow effect
    });
    // Then, apply a yellow glow to the current item
    const currentItem = currentRows[index];
    console.log(`The current row is ${currentItem}`);
    // const nextItem = currentItems[(index + 1)];

    if (currentItem) {
      currentItem.style.boxShadow = "0 0 30px purple"; // Apply a yellow glow effect
    }
  };

  const highlightItem = (index) => {
    // First, remove the yellow glow from all current items
    currentItems.forEach((item) => {
      item.style.boxShadow = ""; // Remove any existing glow effect
    });
    // Then, apply a yellow glow to the current item
    const currentItem = currentItems[index];
    if (currentItem) {
      currentItem.style.boxShadow = "0 0 30px purple"; // Apply a yellow glow effect
    }
  };

  const cycleItems = () => {
    if (!cycling) return;
    console.log("t2sval " + t2scycle);
    if (currentItems.length == 47 && t2scycle == 2) {
      highlightRow(currentIndex);
      currentIndex = (currentIndex + 1) % currentRows.length; // Use currentItems for length
      rowidx = currentIndex;
      console.log("Current index sonk= " + currentIndex);
    } else {
      if (currentItems.length == 47 && t2scycle == 1) {
        // the individual starting pt now
        console.log("rowidx" + rowidx);
        if (rowidx == 0) {
          console.log("Current index sink= " + currentIndex);
          highlightItem(currentIndex);
          currentIndex = currentIndex == 46 ? 44 : (currentIndex += 1);
          console.log("Next index is equal to = " + currentIndex);
        } else {
          minv = rowDict[rowidx];
          maxv = rowidx != 8 ? rowDict[rowidx + 1] - 1 : 43;

          highlightItem(currentIndex);
          console.log("Current index is equal to = " + currentIndex);
          currentIndex = currentIndex < maxv ? currentIndex + 1 : minv;
          // currentIndex = (currentIndex + 1) % currentItems.length; // Use currentItems for length
          console.log("Next index is equal to = " + currentIndex);
        }
      } else {
        highlightItem(currentIndex);
        currentIndex = (currentIndex + 1) % currentItems.length; // Use currentItems for length
        console.log("Current index sinkk= " + currentIndex);
      }
    }
    cycleTimeout = setTimeout(cycleItems, cycleTime);
  };

  // Use a more generic event listener that checks if the currentContainer contains the event target
  document.addEventListener("pointerdown", function (event) {
    if (currentContainer.contains(event.target)) {
      cycling = true;
      cycleItems();
    }
  });

  document.addEventListener("pointerup", function () {
    if (!cycling) return;
    clearTimeout(cycleTimeout);
    cycling = false;
    console.log("POINTERUPCURIDX: " + currentIndex);
    if (currentIndex == 4 && subs != "text-2-speech" && rowidx == 5) {
      handleEmail();
    }
    if (
      ((currentIndex == 4 && rowidx == 5) ||
        currentIndex == 15 ||
        currentIndex == 25) &&
      subs == "text-2-speech"
    ) {
      console.log("speak button is getting hit");
      speakPhrase();
      console.log("SUBMENUID: " + subs);
      if (currentIndex == 4 || currentIndex == 15 || currentIndex == 25) {
        currentItems[14].style.boxShadow = "";
        currentItems[24].style.boxShadow = "";
        currentItems[33].style.boxShadow = "";
      }
    }
    if (currentIndex == 44) {
      const t2sContainer = document.getElementById("text-2-speech");
      const emailt2sContainer = document.getElementById("send_email_text");
      currentItems.forEach((item) => {
        item.style.boxShadow = ""; // Remove any existing glow effect
      });
      try {
        currentItems = keyboardContainer.querySelectorAll(
          ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
        );
      } catch {
        currentItems = emailKeyboardContainer.querySelectorAll(
          ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
        );
      }
      currentItems.forEach((item) => {
        item.style.boxShadow = ""; // Remove any existing glow effect
      });
      try {
        currentItems = t2sContainer.querySelectorAll(
          ".phrase-text,.button-main-menu"
        );
        openSubmenu(event, "main-menu");
      } catch {
        currentItems = emailt2sContainer.querySelectorAll(
          ".phrase-text,.button-main-menu"
        );
        openSubmenu(event, "main-menu");
      }
    }
    if (currentItems.length == 47 && t2scycle == 2) {
      // const selectedItemIndex = (currentIndex === 0 ? currentItems.length : currentIndex) - 1;
      // currentItems[selectedItemIndex].click(); // Click the highlighted item using currentItems

      currentIndex = rowDict[currentIndex];
      t2scycle = 1;
      if (
        currentIndex == 0 ||
        currentIndex == 1 ||
        currentIndex == 2 ||
        currentIndex == 3
      ) {
        currentItems[currentIndex].click(); // Click the highlighted item using currentItems
        currentItems[currentIndex].style.boxShadow = ""; // Click the highlighted item using currentItems
        currentIndex = 0;
        t2scycle = 2;
      }
    } else {
      const selectedItemIndex =
        (currentIndex === 0 ? currentItems.length : currentIndex) - 1;
      currentItems[selectedItemIndex].click(); // Click the highlighted item using currentItems
      currentItems[selectedItemIndex].style.boxShadow = ""; // Click the highlighted item using currentItems

      currentIndex = 0;
      t2scycle = 2;
    }
  });
});

/*
--------------------------------------------------
        SENDING EMAIL FUNCTION
--------------------------------------------------
*/
function sendEmailToSuzanne() {
  const message = localStorage.getItem("emailText").toLowerCase();
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "Suzanne_M_Novelli@GLIC.com",
    subject: "None",
    message: message,
  };
  emailjs.send("service_c22kjag", "template_hnlo6qs", emailParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      localStorage.removeItem("emailText");
      window.location.href = "index.html";
    },
    function (error) {
      console.error("FAILED...", error);
    }
  );
}

function sendEmailToDavid() {
  const message = localStorage.getItem("emailText").toLowerCase();
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "DRNOVELLI@aol.com",
    subject: "None",
    message: message,
  };
  emailjs.send("service_c22kjag", "template_hnlo6qs", emailParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      localStorage.removeItem("emailText");
      window.location.href = "index.html";
    },
    function (error) {
      console.error("FAILED...", error);
    }
  );
}

function sendEmailToSandy() {
  const message = localStorage.getItem("emailText").toLowerCase();
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "Sanov17@aol.com",
    subject: "None",
    message: message,
  };
  emailjs.send("service_c22kjag", "template_hnlo6qs", emailParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      localStorage.removeItem("emailText");
      window.location.href = "index.html";
    },
    function (error) {
      console.error("FAILED...", error);
    }
  );
}

function sendEmailToNatalie() {
  const message = localStorage.getItem("emailText").toLowerCase();
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "Npersichini@palliativecare.org",
    subject: "None",
    message: message,
  };
  emailjs.send("service_c22kjag", "template_hnlo6qs", emailParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      localStorage.removeItem("emailText");
      window.location.href = "index.html";
    },
    function (error) {
      console.error("FAILED...", error);
    }
  );
}

function handleEmail() {
  var textBox = document.getElementById("phrase-text-box");
  var text = textBox.innerText;

  localStorage.setItem("emailText", text);

  window.location.href = "send-email.html";
}
