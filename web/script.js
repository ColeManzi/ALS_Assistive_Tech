/*
-------------------------------------------
Constants
-------------------------------------------
*/

const plugSelectOrder = [
    "plug-all",
    "plug-1",
    "plug-2",
    "plug-3",
    "plug-4",
    "plug-5"
    ,"main-menu-btn"
]

const plugSubmenuOrder = [
    "plug-submenu-on",
    "plug-submenu-off",
    "plug-submenu-cancel"
]

const mainMenuOrder = [
    "plugs"
    ,"keyboard"
    ,"settings"
]

const settingsMenuOrder = [
    "single-input"
    ,"touch-mouse"
    ,"settings-back"
]

const keyboardMenuOrder = [
    "keyboard-new-btn"
    ,"keyboard-menu-btn"
]

const menuIdMapping = {
    "plug-select" : plugSelectOrder,
    "plug-submenu": plugSubmenuOrder
    ,"main-menu": mainMenuOrder
    ,"settings-menu": settingsMenuOrder
    ,"keyboard-menu": keyboardMenuOrder
}

/*
---------------------------------------
Global Vars
---------------------------------------
*/
let singleInputMode = false
var selectedIndex = -1
var selectedMenuOrder
var previousElement
var previousColor
var cycleTimeout
var cycleTime =  1000  //2000

function init() {
    setTime();
    if (singleInputMode) {
        document.body.onclick = e => accessibilityMouseClick()
        selectedMenuOrder = mainMenuOrder;
        resetCycle('main-menu')
    }
}

function setTime() {
    const currTime = new Date();
    let hr = currTime.getHours();
    let min = currTime.getMinutes();
    let amPm = "AM"
    if (min < 10) {
        min = "0" + min;
    }
    if (hr >= 12) {
        hr = hr % 12;
        amPm = "PM";
    }
    if (hr == 0) {
        hr = 12;
    }
    document.getElementById("time").innerHTML = "<h2>" + hr + ":" + min + " " + amPm + "</h2>";
    setTimeout(setTime, 1000);
}

/*
----------------------------------------------
Menu Control Functions
----------------------------------------------
*/

const changeMenu = (e, newMenuID) => {
    e.stopPropagation()
    let currentMenu = document.getElementById(e.currentTarget.id)
                              .parentElement
    let newMenu = document.getElementById(newMenuID)

    if (singleInputMode) resetCycle(newMenuID)

    currentMenu.style.visibility = 'hidden'
    newMenu.style.visibility = 'visible'
}

function openSubmenu(event, supermenuId, submenuId) {
    event.stopPropagation();
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)

    if (singleInputMode) resetCycle(submenuId)

    supermenu.style.visibility = 'hidden'
    submenu.style.visibility = 'visible'
}

function closeSubmenu(event, supermenuId, submenuId) {
    event.stopPropagation();
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)
    
    if (singleInputMode) resetCycle(supermenuId)
    
    submenu.style.visibility = 'hidden'
    supermenu.style.visibility = 'visible'
}

function openPlugSubmenu(event, plugLabel) {
    let titleElement = document.getElementById('plug-submenu-title')
    titleElement.innerHTML = plugLabel == 'all' ? 'All Plugs' : 'Plug ' + plugLabel
    titleElement.parentElement.setAttribute('plug-label', plugLabel)

    openSubmenu(event, 'plug-select', 'plug-submenu')
    
}

/*
--------------------------------------------------
Single Input Mode Functions
--------------------------------------------------
*/

const toggleInputMode = (e, mode) => {
    if (mode == 'on') {
        singleInputMode = true
        document.body.onclick = accessibilityMouseClick
    } else {
        singleInputMode = false
        if (cycleTimeout != null) previousElement.style.backgroundColor = previousColor
        document.body.onclick = null
        clearTimeout(cycleTimeout)
    }
    changeMenu(e, 'main-menu')
}


const resetCycle = (menuId) => {
    selectedIndex = -1
    selectedMenuOrder = menuIdMapping[menuId]
    clearTimeout(cycleTimeout)
    cycleSelection()
}


function accessibilityMouseClick() {
    if (singleInputMode) {  // Something keeps reseting body.click to accessibilityMouseClick, check to fix error
        document.body.onclick = e => {}
        selectedElement = document.getElementById(selectedMenuOrder[selectedIndex])
        selectedElement.click();
        document.body.onclick = e => accessibilityMouseClick()
    }
}

function cycleSelection() {
    if (previousElement != null) previousElement.style.backgroundColor = previousColor;
    selectedIndex = (selectedIndex + 1) % selectedMenuOrder.length
    var hoveredElement = document.getElementById(selectedMenuOrder[selectedIndex])
    previousElement = hoveredElement
    previousColor = previousElement.style.backgroundColor;
    hoveredElement.style.backgroundColor = "orange";
    // Handle Hover Element Highlighting
    // console.log(selectedMenuOrder[selectedIndex])
    cycleTimeout = setTimeout(cycleSelection, cycleTime)
}

function togglePlug(e, state) {
    let plugId = document.getElementById('plug-submenu').getAttribute('plug-label')
    eel.togglePlug(plugId + state)
    let statusEl = document.getElementById("status-" + plugId)
    if (state == 'on') {
        // Toggle Power Indicator On
    }
    else {
        // Toggle Power Indicator Off
    }
    changeMenu(e, 'plug-select')
}

/*
--------------------------------------------------
Keyboard Globals
--------------------------------------------------
*/
let msgHistory = {
    "topRow": ""
    ,"middleRow": ""
    ,"editRow": ""
}

const msgElements = {
    "topRow": document.getElementById("text-string-top")
    ,"middleRow": document.getElementById("text-string-middle")
    ,"editRow": document.getElementById("text-string-bottom")
}

let alphaKeyboardInnerHTML = `
<div id="keyboard-row-1" class="keyboard-row alpha-keyboard-row">
    <button id="done-key"       class="keyboard-button alpha-keyboard" onclick="endNewMessage()">DONE</button>    
    <button id="space-key"      class="keyboard-button alpha-keyboard" value=" " onclick="updateEditString(this.value)">SPACE</button>    
    <button id="delete-key"     class="keyboard-button alpha-keyboard" value="del" onclick="updateEditString(this.value)">DEL</button>
    <button id="num-alpha-key"  class="keyboard-button alpha-keyboard" value="num" onclick="changeAlphanumericMode(this.value)">NUM</button>
</div>
<div id="keyboard-row-2" class="keyboard-row alpha-keyboard-row">
    <button id="A-key" class="keyboard-button alpha-key" value="A" onclick="updateEditString(this.value)">A</button>
    <button id="B-key" class="keyboard-button alpha-key" value="B" onclick="updateEditString(this.value)">B</button>
    <button id="C-key" class="keyboard-button alpha-key" value="C" onclick="updateEditString(this.value)">C</button>
    <button id="D-key" class="keyboard-button alpha-key" value="D" onclick="updateEditString(this.value)">D</button>
</div>
<div id="keyboard-row-3" class="keyboard-row alpha-keyboard-row">
    <button id="E-key" class="keyboard-button alpha-key" value="E" onclick="updateEditString(this.value)">E</button>
    <button id="F-key" class="keyboard-button alpha-key" value="F" onclick="updateEditString(this.value)">F</button>
    <button id="G-key" class="keyboard-button alpha-key" value="G" onclick="updateEditString(this.value)">G</button>
    <button id="H-key" class="keyboard-button alpha-key" value="H" onclick="updateEditString(this.value)">H</button>
</div>
<div id="keyboard-row-4" class="keyboard-row alpha-keyboard-row">
    <button id="I-key" class="keyboard-button alpha-key" value="I" onclick="updateEditString(this.value)">I</button>
    <button id="J-key" class="keyboard-button alpha-key" value="J" onclick="updateEditString(this.value)">J</button>
    <button id="K-key" class="keyboard-button alpha-key" value="K" onclick="updateEditString(this.value)">K</button>
    <button id="L-key" class="keyboard-button alpha-key" value="L" onclick="updateEditString(this.value)">L</button>
</div>
<div id="keyboard-row-5" class="keyboard-row alpha-keyboard-row">
    <button id="M-key" class="keyboard-button alpha-key" value="M" onclick="updateEditString(this.value)">M</button>
    <button id="N-key" class="keyboard-button alpha-key" value="N" onclick="updateEditString(this.value)">N</button>
    <button id="O-key" class="keyboard-button alpha-key" value="O" onclick="updateEditString(this.value)">O</button>
    <button id="P-key" class="keyboard-button alpha-key" value="P" onclick="updateEditString(this.value)">P</button>
</div>
<div id="keyboard-row-6" class="keyboard-row alpha-keyboard-row">
    <button id="Q-key" class="keyboard-button alpha-key" value="Q" onclick="updateEditString(this.value)">Q</button>
    <button id="R-key" class="keyboard-button alpha-key" value="R" onclick="updateEditString(this.value)">R</button>
    <button id="S-key" class="keyboard-button alpha-key" value="S" onclick="updateEditString(this.value)">S</button>
    <button id="T-key" class="keyboard-button alpha-key" value="T" onclick="updateEditString(this.value)">T</button>
</div>
<div id="keyboard-row-7" class="keyboard-row alpha-keyboard-row">
    <button id="U-key" class="keyboard-button alpha-key" value="U" onclick="updateEditString(this.value)">U</button>
    <button id="V-key" class="keyboard-button alpha-key" value="V" onclick="updateEditString(this.value)">V</button>
    <button id="W-key" class="keyboard-button alpha-key" value="W" onclick="updateEditString(this.value)">W</button>
    <button id="X-key" class="keyboard-button alpha-key" value="X" onclick="updateEditString(this.value)">X</button>
</div>
<div id="keyboard-row-8" class="keyboard-row alpha-keyboard-row">
    <button id="Y-key" class="keyboard-button alpha-key" value="Y" onclick="updateEditString(this.value)">Y</button>
    <button id="Z-key" class="keyboard-button alpha-key" value="Z" onclick="updateEditString(this.value)">Z</button>
    <button id="period-key"      class="keyboard-button" value="." onclick="updateEditString(this.value)">.</button>
    <button id="apostrophe-key"  class="keyboard-button" value="'" onclick="updateEditString(this.value)">'</button>
</div>
`

let numericKeyboardInnerHTML = `
<div id="keyboard-row-1" class="keyboard-row num-keyboard-row">
    <button id="done-key"       class="keyboard-button alpha-keyboard" onclick="endNewMessage()">DONE</button>    
    <button id="space-key"      class="keyboard-button alpha-keyboard" value=" " onclick="updateEditString(this.value)">SPACE</button>    
    <button id="delete-key"     class="keyboard-button alpha-keyboard" value="del" onclick="updateEditString(this.value)">DEL</button>
    <button id="num-alpha-key"  class="keyboard-button alpha-keyboard" value="alpha" onclick="changeAlphanumericMode(this.value)">ALPHA</button>
</div>
<div id="keyboard-row-2" class="keyboard-row num-keyboard-row">
    <button class="keyboard-button alpha-key" value="1" onclick="updateEditString(this.value)">1</button>
    <button class="keyboard-button alpha-key" value="2" onclick="updateEditString(this.value)">2</button>
    <button class="keyboard-button alpha-key" value="3" onclick="updateEditString(this.value)">3</button>
    <button class="keyboard-button alpha-key" value="4" onclick="updateEditString(this.value)">4</button>
</div>
<div id="keyboard-row-3" class="keyboard-row num-keyboard-row">
    <button class="keyboard-button alpha-key" value="5" onclick="updateEditString(this.value)">5</button>
    <button class="keyboard-button alpha-key" value="6" onclick="updateEditString(this.value)">6</button>
    <button class="keyboard-button alpha-key" value="7" onclick="updateEditString(this.value)">7</button>
    <button class="keyboard-button alpha-key" value="8" onclick="updateEditString(this.value)">8</button>
</div>
<div id="keyboard-row-4" class="keyboard-row num-keyboard-row">
    <button class="keyboard-button alpha-key" value="9" onclick="updateEditString(this.value)">9</button>
    <button class="keyboard-button alpha-key" value="0" onclick="updateEditString(this.value)">0</button>
    <button class="keyboard-button alpha-key" value="." onclick="updateEditString(this.value)">.</button>
    <button class="keyboard-button alpha-key" value="," onclick="updateEditString(this.value)">,</button>
</div>
`

let keyboardSuperMenuInnerHTML =`
<button id="keyboard-new-btn"  class="menu-button" onclick="startNewMessage()">NEW</button>
<button id="keyboard-menu-btn" class="menu-button" onclick="closeSubmenu(event, 'main-menu', 'keyboard-menu')">MENU</button>
`

let kbAttachPoint = document.getElementById('keyboard-attach-point')
let editString = ""

/*
--------------------------------------------------
Keyboard Functions
--------------------------------------------------
*/
const startNewMessage = () => {
    // Update the message history and clear row that will be edited.
    msgElements["topRow"].innerText    = msgElements["middleRow"].innerText
    msgElements["middleRow"].innerText = msgElements["editRow"].innerText
    msgElements["editRow"].innerText   = ""
    editString = "" // Update the string that will be modified by keypresses
 
    // Show keyboard
    kbAttachPoint.innerHTML = alphaKeyboardInnerHTML
}

const endNewMessage = () => {
    // Update the message strings in memory and call eel function to save messge history.
    msgHistory["topRow"]    = msgElements["topRow"].innerText
    msgHistory["middleRow"] = msgElements["middleRow"].innerText
    msgHistory["editRow"]   = msgElements["editRow"].innerText

    // Call eel update function when available

    kbAttachPoint.innerHTML = keyboardSuperMenuInnerHTML
}

const updateEditString = (char) => {
    if (char != 'del') {
        editString += char
    } else {
        if (editString.length > 0) editString = editString.slice(0, -1)
    }
 
    msgElements["editRow"].innerText = editString
}

const changeAlphanumericMode = (mode) => {
    if (mode == 'num') {
        kbAttachPoint.innerHTML = numericKeyboardInnerHTML
    } else if (mode == 'alpha') {
        kbAttachPoint.innerHTML = alphaKeyboardInnerHTML
    }

}