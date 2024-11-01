#Ryan: My test file I used to mess with pyttsx3 library. Phrases containing more than 5 letters only get spoken.

import pyttsx3
import time


# # espeak.synth("hi")

import subprocess
subprocess.run(["espeak", "-v", "english+f4", "longer word"])

# #def test_tts():
# engine = pyttsx3.init('espeak')
# voices = engine.getProperty("voices")
# #for index, voice in enumerate(voices):
# # print(f"Index: {index}, Name: {voice.name}, Language: {voice.languages}")
# engine.setProperty("rate", 150)
# engine.setProperty("volume", 1.0)
# engine.setProperty("voice", voices[66].id) #65 or 66 says yes
# print(voices[66].id, voices[66].languages)
# engine.say("yes")
# engine.runAndWait()
# phrases = ["aaaaaaaaaaaaa", "hi", "yes", "test", "hello a", "letters and numbers", "are you ok?"]
# for p in phrases:
#     try:
#         engine.say(p)
#         engine.runAndWait()
#         print(f"Just spoke \"{p}\"")
#     except Exception as e:
#         print(f"Exception occurred: {e}")
#     time.sleep(1)
# # i = 0
# # for voice in voices:
# #     print(f'i: {i}, voice: {voice.id}, language: {voice.languages}')
# #     engine.setProperty("voice", voice.id)
# #     engine.say("yes")
# #     engine.runAndWait()
# #     time.sleep(1)
# #     i += 1
# # engine.say("hello you there hi yes no")
# # engine.runAndWait()
# engine.stop()

# test_tts()