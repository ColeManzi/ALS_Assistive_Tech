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
]

const plugSubmenuOrder = [
    "plug-submenu-on",
    "plug-submenu-off",
    "plug-submenu-cancel"
]

const menuIdMapping = {
    "plug-select" : plugSelectOrder,
    "plug-submenu": plugSubmenuOrder
}
/*
---------------------------------------
Global Vars
---------------------------------------
*/

var selectedIndex = -1
var selectedMenuOrder
var previousElement
var previousColor
var cycleTimeout

function init() {
    setTime();
    selectedMenuOrder = plugSelectOrder;
    cycleSelection();
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

function openSubmenu(supermenuId, submenuId) {
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)
    selectedIndex = -1
    selectedMenuOrder = menuIdMapping[submenuId]
    clearTimeout(cycleTimeout)
    cycleSelection()
    supermenu.style.visibility = 'hidden'
    submenu.style.visibility = 'visible'
}

function closeSubmenu(supermenuId, submenuId) {
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)
    selectedIndex = -1
    selectedMenuOrder = menuIdMapping[supermenuId]
    clearTimeout(cycleTimeout)
    cycleSelection()
    submenu.style.visibility = 'hidden'
    supermenu.style.visibility = 'visible'
}

function openPlugSubmenu(plugLabel) {
    
    let titleElement = document.getElementById('plug-submenu-title')
    titleElement.innerHTML = plugLabel == 'all' ? 'All Plugs' : 'Plug ' + plugLabel
    titleElement.parentElement.setAttribute('plug-label', plugLabel)

    openSubmenu('plug-select', 'plug-submenu')
}

/*
--------------------------------------------------
Single Input Mode Functions
--------------------------------------------------
*/

function accessibilityMouseClick() {
    document.body.onclick = e => {}
    selectedElement = document.getElementById(selectedMenuOrder[selectedIndex])
    console.log(selectedElement)
    selectedElement.click();
    document.body.onclick = e => accessibilityMouseClick()
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
    cycleTimeout = setTimeout(cycleSelection, 2000)
}

function togglePlug(state) {
    let plugId = document.getElementById('plug-submenu').getAttribute('plug-label')
    eel.togglePlug(plugId + state)
    let statusEl = document.getElementById("status-" + plugId)
    if (state == 'on') {
        // Toggle Power Indicator On
    }
    else {
        // Toggle Power Indicator Off
    }
}