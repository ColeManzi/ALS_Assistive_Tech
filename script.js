let submenu = document.getElementById('plug-submenu')
let on = document.getElementById('plug-on')
let off = document.getElementById('plug-off')
let pcan = document.getElementById('plug-cancel')


const BGColors = {
    'p1-emu':'red',
    'p2-emu':'purple',
    'p3-emu':'orange',
    'p4-emu':'green'
}


const setOnOff = (gridID) => {
    const ele = document.getElementById(gridID)
    on.onclick =  () => ele.style.backgroundColor = BGColors[gridID]
    off.onclick = () => ele.style.backgroundColor = 'black'
    pcan.onclick = () => submenu.classList.add('hidden')
    submenu.classList.remove('hidden')
}


