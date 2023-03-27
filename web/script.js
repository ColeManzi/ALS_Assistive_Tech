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

const menuIdMapping = {
    "plug-select" : plugSelectOrder,
    "plug-submenu": plugSubmenuOrder
    ,"main-menu": mainMenuOrder
    ,"settings-menu": settingsMenuOrder
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
Keyboard Stuff
--------------------------------------------------
*/
let topRow = ""
let middleRow = ""
let editRow = ""

let alphaKeyboardInnerHTML = `<div id="keyboard-row-1" class="keyboard-row">
<button id="done-new-key" class="keyboard-button">NEW</button>    
<button id="space-menu-key" class="keyboard-button">MENU</button>    
<button id="delete-key" class="keyboard-button">DEL</button>
<button id="num-alpha-key" class="keyboard-button">NUM</button>
</div>
<div id="keyboard-row-2" class="keyboard-row">
<button id="A-key" class="keyboard-button alpha-key">a</button>
<button id="B-key" class="keyboard-button alpha-key">b</button>
<button id="C-key" class="keyboard-button alpha-key">c</button>
<button id="D-key" class="keyboard-button alpha-key">d</button>
</div>
<div id="keyboard-row-3" class="keyboard-row">
<button id="E-key" class="keyboard-button alpha-key">e</button>
<button id="F-key" class="keyboard-button alpha-key">f</button>
<button id="G-key" class="keyboard-button alpha-key">g</button>
<button id="H-key" class="keyboard-button alpha-key">h</button>
</div>
<div id="keyboard-row-4" class="keyboard-row">
<button id="I-key" class="keyboard-button alpha-key">i</button>
<button id="J-key" class="keyboard-button alpha-key">j</button>
<button id="K-key" class="keyboard-button alpha-key">k</button>
<button id="L-key" class="keyboard-button alpha-key">l</button>
</div>
<div id="keyboard-row-5" class="keyboard-row">
<button id="M-key" class="keyboard-button alpha-key">m</button>
<button id="N-key" class="keyboard-button alpha-key">n</button>
<button id="O-key" class="keyboard-button alpha-key">o</button>
<button id="P-key" class="keyboard-button alpha-key">p</button>
</div>
<div id="keyboard-row-6" class="keyboard-row">
<button id="Q-key" class="keyboard-button alpha-key">q</button>
<button id="R-key" class="keyboard-button alpha-key">r</button>
<button id="S-key" class="keyboard-button alpha-key">s</button>
<button id="T-key" class="keyboard-button alpha-key">t</button>
</div>
<div id="keyboard-row-7" class="keyboard-row">
<button id="U-key" class="keyboard-button alpha-key">u</button>
<button id="V-key" class="keyboard-button alpha-key">v</button>
<button id="W-key" class="keyboard-button alpha-key">w</button>
<button id="X-key" class="keyboard-button alpha-key">x</button>
</div>
<div id="keyboard-row-8" class="keyboard-row">
<button id="Y-key" class="keyboard-button alpha-key">y</button>
<button id="Z-key" class="keyboard-button alpha-key">z</button>
<button id="period-key" class="keyboard-button">.</button>
<button id="apostrophe-key" class="keyboard-button">'</button>
</div>`

let numericKeyboardInnerHTML = ``