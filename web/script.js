/*
-------------------------------------------
            Constants
-------------------------------------------
*/
let subs = "";
const plugSelectOrder = [
  "plug-all",
  "plug-1",
  "plug-2",
  "plug-3",
  "plug-4",
  "plug-5",
  "main-menu-btn",
];

const plugSubmenuOrder = [
  "plug-submenu-on",
  "plug-submenu-off",
  "plug-submenu-cancel",
];

const mainMenuOrder = ["plugs", "keyboard", "settings"];

const settingsMenuOrder = [
  "single-input",
  "touch-mouse",
  "configure-speed",
  "settings-back",
];

const speedMenuOrder = [
  "speed-500",
  "speed-1000",
  "speed-1500",
  "speed-2000",
  "speed-back",
];

const keyboardMenuOrder = ["keyboard-new-btn", "keyboard-menu-btn"];

let dynamicKeyboardOrder = []; // Used for single input mode

let menuIdMapping = {
  "plug-select": plugSelectOrder,
  "plug-submenu": plugSubmenuOrder,
  "main-menu": mainMenuOrder,
  "settings-menu": settingsMenuOrder,
  "keyboard-menu": keyboardMenuOrder,
  "dynamic-kb": dynamicKeyboardOrder,
  "configure-speed-menu": speedMenuOrder,
};

let plugLabels = {
  1: "Plug 1",
  2: "PLug 2",
  3: "Plug 3",
  4: "Plug 4",
  5: "Plug 5",
};

/*
_____________________________________________________________________________________________________
                                            MAIN MENU CONSTANTS
_____________________________________________________________________________________________________
*/

// const menuContainer = document.getElementById("main-menu");
// const menuItems = menuContainer.querySelectorAll(
//   ".button-text-speech,.button-yes-no, .button-common-phrase"
// );

/*
_____________________________________________________________________________________________________
                                            T2S/KEYBOARD CONSTANTS
_____________________________________________________________________________________________________
*/

// const t2sContainer = document.getElementById("text-2-speech");
// const t2sItems = t2sContainer.querySelectorAll(
//   ".phrase-text,.button-main-menu"
// );

// const keyboardContainer = document.getElementById("text-2-speech");
// const keyboardItems = keyboardContainer.querySelectorAll(
//   ".prediction,.prediction-2,.prediction-3,.key-mini-space,.key-go-back,.key-auto-2,.key-q,.key-w,.key-e,.key-r,.key-t,.key-y,.key-u,.key-i,.key-o,.key-p,.key-auto,.key-a,.key-s,.key-d,.key-f,.key-g,.key-h,.key-j,.key-k,.key-l,.key-z,.key-x,.key-c,.key-v,.key-b,.key-n,.key-m,.key-backspace,.key-00,.key,.key-2,.key-3,.key-4,.key-5,.key-6,.key-7,.key-8,.key-9,.key-speak-it,.key-new-phrase"
// );

/**
___________________________________________________________________________________________________
                                        YES/NO CONSTANTS
___________________________________________________________________________________________________
 */

// const yesNoContainer = document.getElementById("yes-no-menu");
// const yesNoItems = yesNoContainer.querySelectorAll(
//   ".button-Yes,.button-No,.button-main-menu"
// );
/*
/*
___________________________________________________________________________________________________
                                        COMMON PHRASES CONSTANTS
___________________________________________________________________________________________________
*/
// const commonPhraseContainer = document.getElementById("common-phrase-menu");
// const commonPhraseItems = commonPhraseContainer.querySelectorAll(
//   ".button-uncomfortable,.button-nauseous,.button-pain,.button-thank-you,.button-hello,.button-bye,.button-main-menu"
// );

/*
____________________________________________________________________________________________________________________
                                        OUTLET CONTROL CONSTANTS
____________________________________________________________________________________________________________________
*/

// const outletContainer = document.getElementById("outlet-menu");
// const outletItems = outletContainer.querySelectorAll(
//   ".button-main-menu,.button-settings,.button-yes-no,.button-common-phrase,.button-text-speech,.button-plug-ON-OFF-5,.button-plug-ON-OFF-4,.button-plug-ON-OFF-1,.button-plug-ON-OFF-2,.button-plug-ON-OFF-3,.button-all-plugs-ON"
// );

/*
_____________________________________________________________________________________________________________________
                                        SETTINGS CONTROL CONSTANTS
_____________________________________________________________________________________________________________________

// const settingsContainer = document.getElementById("settings-page");
// const settingsItems = settingsContainer.querySelectorAll(
//   ".switch-speed-sec,.switch-speed-sec-2,.switch-speed-sec-3,.switch-speed-sec-4,.switch-speed-sec-5,.switch-speed-sec-6,.switch-speed-sec-7,.switch-speed-sec-8,.button-go-back"
// );
/*
____________________________________________________________________________________________________________________
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
let currentContainer = null;
let currentItems = null;

let keyboardContainer = null;
let keyboardItems = null;

let emailKeyboardContainer = null;
let emailKeyboardItems = null;

let rowDict = null;
let currentRows = null;

if (document.getElementById("main-menu")) {
  const menuContainer = document.getElementById("main-menu");
  const menuItems = menuContainer.querySelectorAll(
    ".button-text-speech,.button-yes-no, .button-common-phrase, .button-send-email, .button-outlet-controls"
  );

  currentContainer = menuContainer;
  currentItems = menuItems;
}

/**  When creating a new HTML file with div elements, include those elements using the format that is seen below
 *   using conditionals. This will allow the application to highlight and cycle over each element for selection.
 *
 *   !!You can't implement them as global constants that are seen above, which when entering a new HTML file
 *   !!for a feature, the div elements from other HTML files can not be read, causing the application to break.
 *   !!This is why the constants above have been commented out
 *
 *
 */

function openSubmenu(event, submenuId) {
  subs = submenuId;
  if (event != undefined) event.stopPropagation();
  let submenu = document.getElementById(submenuId);

  if (submenu) {
    if (submenuId === "main-menu") {
      currentContainer = menuContainer;
      currentItems = menuItems;
    }
    if (submenuId === "text-2-speech") {
      const t2sContainer = document.getElementById("text-2-speech");
      const t2sItems = t2sContainer.querySelectorAll(
        ".phrase-text,.button-main-menu"
      );

      keyboardContainer = document.getElementById("text-2-speech");
      keyboardItems = keyboardContainer.querySelectorAll(
        ".prediction,.prediction-2,.prediction-3,.key-mini-space,.key-q,.key-w,.key-e,.key-r,.key-t,.key-y,.key-u,.key-i,.key-o,.key-p,.key-auto,.key-a,.key-s,.key-d,.key-f,.key-g,.key-h,.key-j,.key-k,.key-l,.key-auto-1,.key-z,.key-x,.key-c,.key-v,.key-b,.key-n,.key-m,.key-backspace,.key-auto-2,.key,.key-2,.key-3,.key-4,.key-5,.key-6,.key-7,.key-8,.key-9,.key-00,.key-speak-it,.key-new-phrase,.key-go-back"
      );
      currentRows = keyboardContainer.querySelectorAll(
        ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
      );
      rowDict = {
        0: 44,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 15,
        7: 25,
        8: 34,
        9: 44,
      };

      currentContainer = t2sContainer;
      currentItems = t2sItems;
      const keyboardButton = document.querySelector(".phrase-text"); // If there's only one keyboard button
      if (keyboardButton) {
        keyboardButton.addEventListener("click", function () {
          console.log("I am here");
          currentContainer = keyboardContainer;
          currentItems = keyboardItems;
          currentItems.forEach((item) => {
            item.style.boxShadow = ""; // Remove any existing glow effect
          });
        });
      }
      const backButton = document.querySelector(".key-go-back"); //for back button
      if (backButton) {
        backButton.addEventListener("click", function () {
          currentContainer = t2sContainer;
          currentItems = t2sItems;
          currentItems.forEach((item) => {
            item.style.boxShadow = ""; // Remove any existing glow effect
          });
        });
      }
    }
    if (submenuId === "send_email_text") {
      const emailt2sContainer = document.getElementById("send_email_text");
      const emailt2sItems = emailt2sContainer.querySelectorAll(
        ".phrase-text,.button-main-menu"
      );

      emailKeyboardContainer = document.getElementById("send_email_text");
      emailKeyboardItems = emailKeyboardContainer.querySelectorAll(
        ".prediction,.prediction-2,.prediction-3,.key-mini-space,.key-q,.key-w,.key-e,.key-r,.key-t,.key-y,.key-u,.key-i,.key-o,.key-p,.key-auto,.key-a,.key-s,.key-d,.key-f,.key-g,.key-h,.key-j,.key-k,.key-l,.key-auto-1,.key-z,.key-x,.key-c,.key-v,.key-b,.key-n,.key-m,.key-backspace,.key-auto-2,.key,.key-2,.key-3,.key-4,.key-5,.key-6,.key-7,.key-8,.key-9,.key-00,.key-speak-it,.key-new-phrase,.key-go-back"
      );
      currentRows = emailKeyboardContainer.querySelectorAll(
        ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
      );
      rowDict = {
        0: 44,
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 15,
        7: 25,
        8: 34,
        9: 44,
      };

      currentContainer = emailt2sContainer;
      currentItems = emailt2sItems;

      const keyboardButton = document.querySelector(".phrase-text"); // If there's only one keyboard button
      if (keyboardButton) {
        keyboardButton.addEventListener("click", function () {
          console.log("I am here");
          currentContainer = emailKeyboardContainer;
          currentItems = emailKeyboardItems;
          currentItems.forEach((item) => {
            item.style.boxShadow = ""; // Remove any existing glow effect
          });
        });
      }
      const backButton = document.querySelector(".key-go-back"); //for back button
      if (backButton) {
        backButton.addEventListener("click", function () {
          currentContainer = emailt2sContainer;
          currentItems = emailt2sItems;
          currentItems.forEach((item) => {
            item.style.boxShadow = ""; // Remove any existing glow effect
          });
        });
      }
    }
    if (submenuId === "yes-no-menu") {
      const yesNoContainer = document.getElementById("yes-no-menu");
      const yesNoItems = yesNoContainer.querySelectorAll(
        ".button-Yes,.button-No,.button-main-menu"
      );

      console.log("yes and no");
      currentContainer = yesNoContainer;
      currentItems = yesNoItems;
    }
    if (submenuId === "common-phrase-menu") {
      const commonPhraseContainer =
        document.getElementById("common-phrase-menu");
      const commonPhraseItems = commonPhraseContainer.querySelectorAll(
        ".button-uncomfortable,.button-nauseous,.button-pain,.button-thank-you,.button-hello,.button-bye,.button-main-menu"
      );

      currentContainer = commonPhraseContainer;
      currentItems = commonPhraseItems;
    }
    if (submenuId === "send-email-menu") {
      const sendEmailContainer = document.getElementById("send-email-menu");
      const sendEmailItems = sendEmailContainer.querySelectorAll(
        ".button-main-menu, .button-Suzanne, .button-David, .button-Sandy, .button-Natalie "
      );

      currentContainer = sendEmailContainer;
      currentItems = sendEmailItems;
    }
    if (submenuId === "outlet-controls-menu") {
      const outletControlContainer = document.getElementById("outlet-controls-menu");
      const outletControlItems = outletControlContainer.querySelectorAll(
        ".button-plug-ON-OFF-5, .button-plug-ON-OFF-4, .button-plug-ON-OFF-3, .button-plug-ON-OFF-2, .button-plug-ON-OFF-1, .button-all-plugs-ON, .button-main-menu"
      );

      currentContainer = outletControlContainer;
      currentItems = outletControlItems;
    }
    if (submenuId === "settings-page") {
      const settingsContainer = document.getElementById("settings-page");
      const settingsItems = settingsContainer.querySelectorAll(
        ".switch-speed-sec,.switch-speed-sec-2,.switch-speed-sec-3,.switch-speed-sec-4,.switch-speed-sec-5,.switch-speed-sec-6,.switch-speed-sec-7,.switch-speed-sec-8,.button-go-back"
      );

      currentContainer = settingsContainer;
      currentItems = settingsItems;
    }
  }
}

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
    console.log("t2sval " + t2scycle)
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
          currentIndex = (currentIndex == 46) ? 44 : (currentIndex += 1);
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
    if (((currentIndex == 4 && rowidx == 5) || currentIndex == 15 || currentIndex == 25) && subs == "text-2-speech") {
      console.log("speak button is getting hit");
      speakPhrase();
      console.log("SUBMENUID: " + subs)
      if (currentIndex == 4 || currentIndex == 15 || currentIndex == 25) {
        currentItems[14].style.boxShadow = "";
        currentItems[24].style.boxShadow = "";
        currentItems[33].style.boxShadow = "";
      }

    }
    if (currentIndex == 44) {
      const t2sContainer = document.getElementById("text-2-speech");
      const emailt2sContainer = document.getElementById("send_email_text")
      currentItems.forEach((item) => {
        item.style.boxShadow = ""; // Remove any existing glow effect
      });
      try {
        currentItems = keyboardContainer.querySelectorAll(
          ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
        );
      }
      catch {
        currentItems = emailKeyboardContainer.querySelectorAll(".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
        );
      }
      currentItems.forEach((item) => {
        item.style.boxShadow = ""; // Remove any existing glow effect
      });
      try {
        currentItems = t2sContainer.querySelectorAll(
          ".phrase-text,.button-main-menu"
        );
        openSubmenu(event, 'main-menu');
      }
      catch {
        currentItems = emailt2sContainer.querySelectorAll(
          ".phrase-text,.button-main-menu"
        );
        openSubmenu(event, 'main-menu');
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
            RF CONTROLLER CODE
--------------------------------------------------
*/
let plugState1 = 0;
let plugState2 = 0;
let plugState3 = 0;
let plugState4 = 0;
let plugState5 = 0;
let plugStateAll = 0;

function toggleAll() {
  if (plugStateAll === 0) {
    plugStateAll = 1;
    console.log("all on");
    eel.togglePlug("allon");
  } else {
    plugStateAll = 0;
    console.log("all off");
    eel.togglePlug("alloff");
  }
}
function togglePlug1() {
  if (plugState1 === 0) {
    plugState1 = 1;
    console.log("1 on");
    eel.togglePlug("1on");
  } else {
    plugState1 = 0;
    console.log("1 off");
    eel.togglePlug("1off");
  }
}
function togglePlug2() {
  console.log(plugState2)
  if (plugState2 === 0) {
    plugState2 = 1;
    console.log("2 on");
    eel.togglePlug("2on");
  } else {
    plugState2 = 0;
    console.log("2 off");
    eel.togglePlug("2off");
  }
}
function togglePlug3() {
  if (plugState3 === 0) {
    plugState3 = 1;
    console.log("3 on");
    eel.togglePlug("3on");
  } else {
    plugState3 = 0;
    console.log("3 off");
    eel.togglePlug("3off");
  }
}
function togglePlug4() {
  if (plugState4 === 0) {
    plugState4 = 1;
    console.log("on");
    eel.togglePlug("4on");
  } else {
    plugState4 = 0;
    console.log("off");
    eel.togglePlug("4off");
  }
}
function togglePlug5() {
  if (plugState5 === 0) {
    plugState5 = 1;
    console.log("on");
    eel.togglePlug("5on");
  } else {
    plugState5 = 0;
    console.log("off");
    eel.togglePlug("5off");
  }
}
/*
--------------------------------------------------
            Keyboard Functions
--------------------------------------------------
*/

// janesKeyboardSelection is custom to a request by Jane and her caretakers. This goes through all
// keys one at a time to select the button needed.

// The following two functions (setKeyboardRowCycle and setKeyboardButtonCycle) allow the device
// to select first the keyboard row and second the keyboard button. It is a faster way of going
// through the keyboard.
const setKeyboardRowCycle = () => {
  if (singleInputMode) {
    let newArr = document.getElementsByClassName("keyboard-row");
    dynamicKeyboardOrder = [];
    for (let ele of newArr) {
      dynamicKeyboardOrder.push(ele.id);
      ele.onclick = (e) => setKeyboardButtonCycle(ele);
    }
    menuIdMapping["dynamic-kb"] = dynamicKeyboardOrder;
    resetCycle("dynamic-kb");
  }
};

const setKeyboardButtonCycle = (ele) => {
  dynamicKeyboardOrder = [];
  for (let child of ele.children) {
    dynamicKeyboardOrder.push(child.id);
  }
  menuIdMapping["dynamic-kb"] = dynamicKeyboardOrder;
  resetCycle("dynamic-kb");
};

/*
--------------------------------------------------
        SENDING EMAIL FUNCTION
--------------------------------------------------
*/
function sendEmailToContact1() {
  const message = localStorage.getItem('emailText').toLowerCase()
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    ToEmail: "colemanz@buffalo.edu",
    subject: "None",
    message: message
  };
  emailjs.send('service_c22kjag', 'template_hnlo6qs', emailParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      localStorage.removeItem('emailText');
      window.location.href = "index.html";
    }, function (error) {
      console.error('FAILED...', error);
    });
}

function sendEmailToContact2() {
  const message = localStorage.getItem('emailText').toLowerCase()
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "",
    subject: "None",
    message: message
  };
  emailjs.send('service_c22kjag', 'template_hnlo6qs', emailParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      localStorage.removeItem('emailText');
      window.location.href = "index.html";
    }, function (error) {
      console.error('FAILED...', error);
    });
}

function sendEmailToContact3() {
  const message = localStorage.getItem('emailText').toLowerCase()
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "",
    subject: "None",
    message: message
  };
  emailjs.send('service_c22kjag', 'template_hnlo6qs', emailParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      localStorage.removeItem('emailText');
      window.location.href = "index.html";
    }, function (error) {
      console.error('FAILED...', error);
    });
}

function sendEmailToContact4() {
  const message = localStorage.getItem('emailText').toLowerCase()
  const emailParams = {
    // KEEP THIS COMMENTED UNTIL WE GIVE HER THE DEVICE
    //ToEmail: "",
    subject: "None",
    message: message
  };
  emailjs.send('service_c22kjag', 'template_hnlo6qs', emailParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      localStorage.removeItem('emailText');
      window.location.href = "index.html";
    }, function (error) {
      console.error('FAILED...', error);
    });
}



function handleEmail() {
  var textBox = document.getElementById("phrase-text-box");
  var text = textBox.innerText;

  localStorage.setItem('emailText', text);

  window.location.href = "send-email.html";
}


/*
_________________________________________________________________________________________________
                                TEXT-2-SPEECH FUNCTIONS
_________________________________________________________________________________________________
*/
class TrieNode {
  constructor() {
    this.children = new Map();
    this.wordCount = 0;
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, count) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
    node.wordCount = count;
  }

  search(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }
    return this.getPredictiveText(node, prefix);
  }

  getPredictiveText(node, prefix) {
    const suggestions = [];
    const queue = [[node, prefix]];

    while (queue.length > 0) {
      const [currentNode, currentPrefix] = queue.shift();

      if (currentNode.isEndOfWord) {
        suggestions.push({ word: currentPrefix, count: currentNode.wordCount });
      }

      for (const [char, child] of currentNode.children) {
        queue.push([child, currentPrefix + char]);
      }
    }

    return suggestions.sort((a, b) => b.count - a.count);
  }
}

async function addToPhrase(char) {
  var textBox = document.getElementById("phrase-text-box");

  if (char === " ") {
    textBox.innerHTML += "&nbsp;"; // Add a non-breaking space for visual consistency
  } else {
    // Append the character or replace the last word with the new one if longer input
    if (char.length > 1) {
      let words = textBox.innerText.split(/\s+/);
      words.pop(); // Remove the last word
      words.push(char); // Add the new word
      textBox.innerText = words.join(" ") + " "; // Reconstruct the text and add a space for further typing
    } else {
      textBox.innerText += char;
    }

    // Get last word from the textBox for prediction
    let words = textBox.innerText.trim().split(/\s+/);
    let lastWord = words.pop(); // The last word for prediction

    console.log("Current content:", textBox.innerText.toLowerCase());
    console.log("Last word for prediction:", lastWord.toLowerCase());

    try {
      const predictions = await predictiveText(lastWord.toLowerCase());
      console.log(predictions);

      const prediction1 = document.getElementById("prediction1");
      const prediction2 = document.getElementById("prediction2");
      const prediction3 = document.getElementById("prediction3");

      if (predictions.length >= 3) {
        prediction1.innerText = predictions[0].toUpperCase();
        prediction2.innerText = predictions[1].toUpperCase();
        prediction3.innerText = predictions[2].toUpperCase();
      } else if (predictions.length == 2) {
        prediction1.innerText = predictions[0].toUpperCase();
        prediction2.innerText = predictions[1].toUpperCase();
        prediction3.innerText = "";
      } else if (predictions.length == 2) {
        prediction1.innerText = predictions[0].toUpperCase();
        prediction2.innerText = "";
        prediction3.innerText = "";
      } else {
        prediction1.innerText = "";
        prediction2.innerText = "";
        prediction3.innerText = "";
      }
    } catch (error) {
      console.error("Prediction error:", error);
    }
  }
}

eel.expose(addToPhrase); //expose to eel

function deleteChar() {
  var textBox = document.getElementById("phrase-text-box");
  var currentText = textBox.innerText;
  textBox.innerText = currentText.slice(0, -1); //removes last char
}
//eel.expose(deleteChar);
async function predictiveText(input) {
  try {
    // Fetch the words.txt file
    const response = await fetch("words.txt");
    if (!response.ok) {
      throw new Error("Failed to fetch file contents");
    }
    const fileContents = await response.text();

    // Split file contents into lines
    const lines = fileContents.split("\n");

    // Build Trie structure from file contents
    const trie = new Trie();
    for (const line of lines) {
      const [word, count] = line.split(" ");
      trie.insert(word, parseInt(count));
    }

    // Perform search and return suggestions
    const suggestions = trie
      .search(input)
      .slice(0, 3)
      .map(({ word }) => word);
    return suggestions;
  } catch (error) {
    throw new Error(
      "Failed to retrieve predictive text suggestions: " + error.message
    );
  }
}

function newPhrase() {
  var textBox = document.getElementById("phrase-text-box");

  // STILL NEED TO IMPLEMENT BIASING INTO WORDS.TXT

  textBox.innerText = ""; //clears the string;

  // clear the prediction boxes
  const prediction1 = document.getElementById("prediction1");
  const prediction2 = document.getElementById("prediction2");
  const prediction3 = document.getElementById("prediction3");

  prediction1.innerText = "";
  prediction2.innerText = "";
  prediction3.innerText = "";
}
//eel.expose(newPhrase);

function speakYes() {
  eel.speak_yes(); // Call the Python function
}
function speakNo() {
  eel.speak_no();
}

function speakItStarts() {
  eel.speak_it_starts();
}
function speakCanIAsk() {
  eel.speak_can_i_ask();
}
function speakPhrase() {
  var textBox = document.getElementById("phrase-text-box");
  var text = textBox.innerText; // Use .value for input box, .innerText or .textContent for div/span
  eel.speak_text_with_vlc(text); // Call the Python function

  textBox.innerText = "";
}
eel.expose(speakPhrase);
/*
--------------------------------------------------
TV Control Functions
--------------------------------------------------
*/
/*
--------------------------------------------------
*/
/* Does nothing but when removed, user TV Remote
buttons click doesn't register to the Arduino */
function powerOn() {
  //eel.powerOn()
}
/*
--------------------------------------------------
*/

// Function to send power on/off command
function powerOnOff() {
  console.log("power");
  eel.powerOnOff();
}
// Function to send mute command
function muteUnmute() {
  console.log("mute");
  eel.muteUnmute();
}

// Function to send volume up command
function volumeUp() {
  console.log("volume up");
  eel.volumeUp();
}

// Function to send volume down command
function volumeDown() {
  console.log("volume down");
  eel.volumeDown();
}

// Function to send channel up command
function channelUp() {
  console.log("channel up");
  eel.channelUp();
}

// Function to send channel down command
function channelDown() {
  console.log("channel down");
  eel.channelDown();
}
/*
_________________________________________________________________________________________________
                                COMMON PHRASE FUNCTIONS
__________________________________________________________________________________________________
*/

function speakUncomfortable() {
  eel.speak_text_with_vlc("I am uncomfortable");
}
function speakNauseous() {
  eel.speak_text_with_vlc("I feel nauseous");
}
function speakPain() {
  eel.speak_text_with_vlc("I am in pain");
}
function speakThankYou() {
  eel.speak_text_with_vlc("Thank You!");
}
function speakHello() {
  eel.speak_text_with_vlc("Hello!");
}
function speakBye() {
  eel.speak_text_with_vlc("Go Bills!");
}

/*
______________________________________________________________________________________________________
                                        SETTINGS PAGE CODE
______________________________________________________________________________________________________
*/
function cycleTimeHalfSecond() {
  cycleTime = 500;
}
function cycleTimeOneSecond() {
  cycleTime = 1000;
}
function cycleTimeOneHalfSecond() {
  cycleTime = 1500;
}
function cycleTimeTwoSecond() {
  cycleTime = 2000;
}
function cycleTimeTwoHalfSecond() {
  cycleTime = 2500;
}
function cycleTimeThreeSecond() {
  cycleTime = 3000;
}
function cycleTimeThreeHalfSecond() {
  cycleTime = 3500;
}
function cycleTimeFourSecond() {
  cycleTime = 4000;
}

/*
--------------------------------------------------
                Config
--------------------------------------------------
*/

function storeConfig(setting, value) {
  eel.storeConfig(setting, value);
}

eel.expose(loadConfig);
function loadConfig(config) {
  cycleTime = config.cycleTime;
  charLimit = config.charLimit;
  plugLabels = config.plugLabels;

  updateLabels();
}

function updateLabels() {
  for (var label in plugLabels) {
    document.getElementById("Plug " + label).innerHTML = plugLabels[label];
  }
  //document.getElementById("speed-label").innerHTML =
  //  "Current Speed: " + timeToSeconds[cycleTime];
}
