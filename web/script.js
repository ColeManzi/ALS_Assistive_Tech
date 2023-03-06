function init() {
    setTime();
    setTimeout(setTime, 1000);
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
}

function openSubmenu(supermenuId, submenuId) {
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)
    supermenu.style.visibility = 'hidden'
    submenu.style.visibility = 'visible'
}

function closeSubmenu(supermenuId, submenuId) {
    let supermenu = document.getElementById(supermenuId)
    let submenu = document.getElementById(submenuId)
    submenu.style.visibility = 'hidden'
    supermenu.style.visibility = 'visible'
}

function openPlugSubmenu(plugLabel) {
    let titleElement = document.getElementById('plug-submenu-title')
    titleElement.innerHTML = plugLabel == 'all' ? 'All Plugs' : 'Plug ' + plugLabel
    titleElement.parentElement.setAttribute('plug-label', plugLabel)

    openSubmenu('plug-select', 'plug-submenu')
}