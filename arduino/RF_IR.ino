#include <RCSwitch.h>
#include <IRremote.hpp> // include the library

IRsend irsend;

RCSwitch mySwitch = RCSwitch();

void setup()
{
    Serial.begin(9600);
    mySwitch.enableReceive(0); // Receiver on interrupt 0 => pin 2 on Uno
    IrSender.begin(3);
}

void loop()
{
    if (mySwitch.available())
    {
        int value = mySwitch.getReceivedValue();

        if (value == 0)
        {
            Serial.println("Unknown encoding");
        }
        else
        {
            Serial.print("Received: ");
            Serial.println(value);
            Serial.println("Sending data...");
            IrSender.sendSony(0x1, 0x15, 2, 12);
        }

        mySwitch.resetAvailable();
    }
}
