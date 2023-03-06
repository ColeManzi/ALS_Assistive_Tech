import eel


@eel.expose
def togglePlug(command):
    print(command)

if __name__ == "__main__":
    eel.init('web')
    eel.start('index.html')