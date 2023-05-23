import eel
import rfcontroller # This import should be commented out when testing on a PC
import json
import pyautogui
import threading

controller = rfcontroller.RFController()
screenWidth, screenHeight = pyautogui.size()
pyautogui.FAILSAFE = False

@eel.expose
def togglePlug(command):
    # print(command) # For testing on a PC, this line should be uncommented, and the following line should be commented out
    controller.sendcode(command) # This line should be commented out when testing on PC, the library is not available on PC

# Below, some lines are commented out because to autostart on the pi we had to include full file paths. When working on the
# software from a PC, uncomment the shortened paths and comment out the absolute paths that include the /home/pi/...
@eel.expose
def storeConfig(setting, value):
    config = {}
    # with open('config.json', 'r') as openfile:
    with open('/home/pi/450-mock-up/config.json', 'r') as openfile:
        config  = json.load(openfile)
    # with open('config.json', 'w') as openfile:
    with open('/home/pi/450-mock-up/config.json', 'w') as writefile:
        config[setting] = value
        json.dump(config, writefile)

@eel.expose
def loadConfig():
    # with open('config.json', 'r') as openfile:
    with open('/home/pi/450-mock-up/config.json', 'r') as openfile:
        config = json.load(openfile)
        eel.loadConfig(config)

@eel.expose
def resetMouse():
    pyautogui.moveTo(0, screenHeight)

if __name__ == "__main__":
    # eel.init('web', allowed_extensions=[".js",".html"])
    eel.init('/home/pi/450-mock-up/web', allowed_extensions=[".js",".html"])
    resetMouse()
    eel.start('index.html', cmdline_args=['--start-fullscreen'])
    
