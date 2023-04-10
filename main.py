import eel
import rfcontroller
import json

controller = rfcontroller.RFController() 

@eel.expose
def togglePlug(command):
    # print(command)
    controller.sendcode(command)

@eel.expose
def storeConfig(setting, value):
    with open('config.json', 'rw') as openfile:
        config  = json.load(openfile)
        config[setting] = value
        json.dump(config, openfile)

@eel.expose
def loadConfig():
    with open('config.json', 'r') as openfile:
        config = json.load(openfile)
        eel.loadConfig(config)


if __name__ == "__main__":
    eel.init('web', allowed_extensions=[".js",".html"])
    eel.start('index.html', cmdline_args=['--start-fullscreen'])
