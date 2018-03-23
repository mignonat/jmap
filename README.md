# jmap
This project is an exemple of some technologies we may use at K2 Geospatial

The technology stack is :
 - _NPM_              : Dependencies manager
 - _Webpack_          : Module bundler
 - _Gulp_             : Task manager (for building code)
 - _TypeScript_       : Static Typed Object Language / Transpiler from typescript to Javascript
 - _TSLint_           : Typescript Code format checker
 - _Babel_            : Transpiler from javascript to jsvascript (not used at this time bacause no js file in the project)
 - _VueJs_            : Amazing Javascript framework
 - _VueX_             : VueJs flux implementation (global datastore)
 - _Material Icons_   : Font icon library by Google

 To install the project :
 - Make sure that you have installed git and npm on your computer
 - Open a terminal
 - Move to the directory where you want to install this project
 - _#git clone https://github.com/mignonat/jmap_ (will create a jmap folder and copy source inside)
 - npm install (will download all project dependencies, can be long > 1 minute)
 - npm run build // build the application

Then you can open the file "index.html" in the project root folder.

In browser console, you can :
   - Launch the application  :
    _#JMapAPI.Application.start()_
   - Create instances of component, ex a LayerListPanel in the container with DOM id = "layer" : 
    _#JMapAPI.Component.LayerListPanel.instanciate("layer")_
    _#JMapAPI.Component.JMapLogo.instanciate("logo")_