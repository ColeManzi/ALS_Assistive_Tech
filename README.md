# CSE450/453 - Assistive Tech

## Overview of Repo

This repository follows a branching model designed to support smooth and structured development. The main branch represents the stable, production-ready codebase and should always contain thoroughly tested and deployable code. The develop branch serves as the integration branch for features and fixes that are actively being worked on—it reflects the latest development progress and may be unstable at times. New features and enhancements are built on separate feature branches, which branch off from develop. Once a feature is complete and tested, it is merged back into develop to be added to the codebase for the client. This workflow helps maintain a clean and organized codebase while enabling parallel development.

## Main Branch

This branch is used for the client. The client's device should always be on this branch. Unless switched due to a bug. 
(If there is multiple clients this branch can be duplicated with the suffix of clients name ex. main-client's-name)

## Develop Branch

This branch is intended for testing newly implemented features. All testing should be conducted here to ensure functionality and stability before merging changes for release to the client. All new code changes chould be merged into develop before moving to main (If there is multiple clients this branch can be duplicated with the suffix of clients name ex. main-client's-name)

## Feature Branch 

Feature branches are used to develop new functionality and should be named according to the purpose or scope of the changes. To keep a feature branch up to date with the latest changes from develop, use the command git pull origin develop to achieve this.

## Libraries

|Library | Links| Notes |
|--------|------|-------|
| eel    | [Documentation](https://github.com/python-eel/Eel)| For Interaction between Python Backend and JS Frontend |
| pyautogui |[Documentation](https://pyautogui.readthedocs.io/en/latest/)| For automated Mouse Control |
| rpi_rf | [Documentation](https://github.com/milaq/rpi-rf) | For transmission of rf signals |

# CSE450 - Assistive Tech - Branches:

## Branch: Separate-HTML

### Description
This branch was created to separate the HTML and CSS files into multiple files, ensuring ease of access when creating new features for the application.

### Guide

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

