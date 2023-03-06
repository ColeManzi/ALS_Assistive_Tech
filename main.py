import eel
import rfcontroller

controller = rfcontroller.RFController() 

@eel.expose
def togglePlug(command):
    controller.sendcode(command)

if __name__ == "__main__":
    eel.init('web')
    eel.start('index.html', cmdline_args=['--start-fullscreen'])
