# jmap
This project is an exemple of some technologies we may use at K2 Geospatial

The technology stack is :
 - npm              : Dependencies manager
 - webpack          : Module bundler
 - gulp             : Task manager (for building code)
 - Typescript       : Static Typed Object Language / Transpiler from typescript to Javascript
 - TSLint           : Typescript Code format checker
 - Babel            : Transpiler from javascript to jsvascript (not used at this time bacause no js file in the project)
 - VueJs            : Amazing Javascript framework
 - VueX             : VueJs flux implementation (global datastore)
 - Material icons   : Font icon library

 To install the project :
 - Make sure that you have installed git and npm on your computer
 - Open a terminal
 - Move to the directory where you want to install this project
 - #git clone https://github.com/mignonat/jmap (will create a jmap folder and copy source inside)
 - npm install (will download all project dependencies, can be long > 1 minute)

Then you can open the file "index.html" in the project root folder.

By default the Application is not launched, so the page is blank

To Launch the application :
 - #JMapAPI.Application.start()
To create instance of PanelLayer in the container with id = "my-panel" : 
 - #JMapAPI.Component.LayerListPanel.instanciate("layer")
 - #JMapAPI.Component.JMapLogo.instanciate("logo")