# JMap
_This project is an exemple of some technologies we may use at K2 Geospatial_

The technology stack is :
 - **NPM**              : Dependencies manager
 - **Webpack**          : Module bundler
 - **Gulp**             : Task manager (for building code)
 - **TypeScript**       : Static Typed Object Language / Transpiler from typescript to Javascript
 - **TSLint**           : Typescript Code format checker
 - **Babel**            : Transpiler from javascript to jsvascript (not used at this time bacause no js file in the project)
 - **VueJs**            : Amazing Javascript framework
 - **VueX**             : VueJs flux implementation (global datastore)
 - **Material Icons**   : Font icon library by Google

 To install the project :
 - Make sure that you have installed git and npm on your computer
 - Open a terminal
 - Move to the directory where you want to install this project
 - **#git clone https://github.com/mignonat/jmap** (will create a jmap folder and copy source inside)
 - npm install (will download all project dependencies, can be long > 1 minute)
 - npm run build // build the application

Then you can open the file "index.html" in the project root folder.

In browser console, you can :
   - Launch the application  :
    **#JMapAPI.Application.start()**
   - Create instances of component, ex a LayerListPanel in the container with DOM id = "layer" : 
    **#JMapAPI.Component.LayerListPanel.create("layer")**
    **#JMapAPI.Component.JMapLogo.create("logo")**