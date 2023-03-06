import eel


@eel.expose
def ToggleOn(gridId):
    print(f"{gridId} - On")

@eel.expose
def ToggleOff(gridId):
    print(f"{gridId} - Off")

if __name__ == "__main__":
    eel.init('web')
    eel.start('index.html')
