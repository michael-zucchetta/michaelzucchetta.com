"Vanilla Project" was cloned and reused (I am not a fan of scaffolding tools) from: https://github.com/michael-zucchetta/requirejs-angular-empty-project.

Install npm and do the following (as they are used in package):

- npm install -g typings //to be checked
- npm install -g karma
- npm install -g karma-cli
- npm install -g protractor
- ./node_modules/protractor/bin/webdriver-manager update
- npm install -g grunt
- npm install -g grunt-cli
- Install gem
- gem install sass
- gem install compass
- npm install -g typings

Then:
- grunt dev for running grunt in dev mode: watch for coffee, sass, jshint is active
- grunt karma for running grunt with karma
- grunt protractor for running protractor once
