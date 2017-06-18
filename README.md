"Vanilla Project" was cloned and reused (I am not a fan of scaffolding tools) from: https://github.com/michael-zucchetta/requirejs-angular-empty-project.

Use of Vundle
https://github.com/VundleVim/Vundle.vim
:PluginInstall

Install npm and do the following (as they are used in package):

- npm install -g webpack
- npm install -g karma-cli
- npm install -g protractor
- ./node_modules/protractor/bin/webdriver-manager update
- npm install -g grunt-cli
Install gem
- install libsass // temp
- gem install sass
- gem install compass
- npm install -g typings (for using it for adding dependencies)
Then:
- typings install react --ambient --save (to install a new typing for typescript)
- grunt dev for running grunt in dev mode: watch for coffee, sass, jshint is active
- grunt karma for running grunt with karma
- grunt protractor for running protractor once

Run http server:
- npm install -g forever

The graphics are an attempt to reproduce how i3 looks like https://i3wm.org/


- add tracking to the backend
- json editor with file upload
- menu
- cv con accesso via Linkedin


# for the dock image
npm install -g compression express mime
