# CSE450 - Assistive Tech - Branch: Separate-HTML

## Description
This branch was created to separate the HTML and CSS files into multiple files, ensuring ease of access when creating new features for the application.

## Guide

When creating a new HTML for a new feature in this application, refer to the following steps:
  - When creating a new button/div element that takes the user to a different feature in the application, ensure you wrap the element with an "a" tag and use an "href" link to switch to a new HTML page.

```
<!--TEXT-2-SPEECH MAIN MENU BUTTON-->
      <a href="text_to_speech.html" onclick="openSubmenu(event,'text-2-speech')">
        <div class="button-text-speech">
          <div class="group">
            <div class="overlap-group">
              <div class="text-wrapper-2">Text-2-speech</div>
            </div>
          </div>
        </div>
      </a>
```
  - After creating a new HTML page for your feature, create a "body" tag and add the function, "openSubmenu()" as an onload function. Pass into "openSubmenu" _event_ as well as the div id of your feature.

```
<body
    onload="openSubmenu(event,'text-2-speech')"
    oncontextmenu="return false;"
  >
    <!--TEXT-2-SPEECH MENU-->
    <div class="desktop-text" id="text-2-speech">
      <div class="overlap-wrapper">
        <div class="overlap">
          <div class="overlap-group">
            <div class="keyboard" id="keyboard">
              <div class="div">

     continued.....
```


## Libraries

|Library | Links| Notes |
|--------|------|-------|
| eel    | [Documentation](https://github.com/python-eel/Eel)| For Interaction between Python Backend and JS Frontend |
| pyautogui |[Documentation](https://pyautogui.readthedocs.io/en/latest/)| For automated Mouse Control |
| rpi_rf | [Documentation](https://github.com/milaq/rpi-rf) | For transmission of rf signals |

## 
