/*
_____________________________________________________________________________________________________
                                            T2S/KEYBOARD CONSTANTS
_____________________________________________________________________________________________________
*/

const t2sContainer = document.getElementById("text-2-speech");
const t2sItems = t2sContainer.querySelectorAll(
  ".phrase-text,.button-main-menu"
);

let keyboardContainer = document.getElementById("text-2-speech");
let keyboardItems = keyboardContainer.querySelectorAll(
  ".prediction,.prediction-2,.prediction-3,.key-mini-space,.key-q,.key-w,.key-e,.key-r,.key-t,.key-y,.key-u,.key-i,.key-o,.key-p,.key-auto,.key-a,.key-s,.key-d,.key-f,.key-g,.key-h,.key-j,.key-k,.key-l,.key-auto-1,.key-z,.key-x,.key-c,.key-v,.key-b,.key-n,.key-m,.key-backspace,.key-auto-2,.key,.key-2,.key-3,.key-4,.key-5,.key-6,.key-7,.key-8,.key-9,.key-00,.key-speak-it,.key-new-phrase,.key-go-back"
);
let currentRows = keyboardContainer.querySelectorAll(
  ".prediction, .prediction-2,.prediction-3,.key-mini-space,.row,.row-2,.row-3,.row-4,.row-5"
);
let rowDict = {
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

let currentContainer = t2sContainer;
let currentItems = t2sItems;

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
