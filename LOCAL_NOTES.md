# Bootstrap 3
```
npm install --save bootstrap@3
```

# Components
```
ng g c header
ng g c recipes --skipTests true
ng g c recipes/recipe-list --skipTests true
ng g c recipes/recipe-detail --skipTests true
ng g c recipes/recipe-list/recipe-item --skipTests true
ng g c shopping-list --skipTests true
ng g c shopping-list/shopping-edit --skipTests true

ng g c recipes/recipe-start --skipTests true
ng g c recipes/recipe-edit --skipTests true
```

# Services
```
ng g s recipes/recipe --skipTests true
ng g s shopping-list/shopping-list --skipTests true

ng g s shared/data-storage --skipTests true

```

# Tips & Tricks
As of Angular 8+, there's a new way of clearing all items in a FormArray:
```
(<FormArray>this.recipeForm.get('ingredients')).clear();
```
The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

It's like manually creating a loop and calling removeAt() for every item.

# Links
- Loading Spinners: https://loading.io/css/
- Firebase Auth REST API Docs: https://firebase.google.com/docs/reference/rest/auth
- More on JWT: https://jwt.io/
- Dynamic Components:  https://angular.io/guide/dynamic-component-loader
- Official Docs: https://angular.io/guide/ngmodules
- NgModules FAQ: https://angular.io/guide/ngmodule-faq

# Firebase Setup
  - Create database
    - https://ngcg-recipe-book.firebaseio.com/
  - Add auth
    - In Database.Rules, set both read and write to "auth != null"
    - Authentication | Set up sign-in method | Email/Password
        - Find firebase Web API Key in Project Settings
        - https://firebase.google.com/docs/reference/rest/auth

# Firebase Hosting:
```
npm install -g firebase-tools
firebase login
firebase init
    Select Hosting: ...
    Select Use an existing project and then the actual project
    Add the dist folder as public directory: dist/recipe-app
    Choose to configure as a single-page app
    Choose NOT to override the index.html file
firebase deploy
    This will then show the utl for both the application and its console\
```
Project Console: https://console.firebase.google.com/project/ngcg-recipe-book/overview
Hosting URL: https://ngcg-recipe-book.web.app



# Ahead of time compilation
```
ng build --prod
```

# Server Routing vs Browser Routing
When deploying your Angular app, it's really important to make sure that your server (like S3) is configured to always serve the index.html file.

Here's why: https://academind.com/learn/angular/angular-q-a/#how-to-fix-broken-routes-after-deployment

# NgRx
- Webpage: http://ngrx.io/
- Github with an example app: https://github.com/ngrx/platform
```
npm install --save @ngrx/store
npm install --save @ngrx/effects
```

#### Alternative NgRx Syntax
https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466642#questions/7350498

(See NEW_NGRX_SYNTAX.md)

# Redux Devtools Extension
- Github: https://github.com/zalmoxisus/redux-devtools-extension
- Webpage: http://extension.remotedev.io/
```
npm install --save-dev @ngrx/store-devtools
```
# Router Store
```
npm install --save @ngrx/router-store
```

# Angular Universal
```
ng add @nguniversal/express-engine --clientProject recipe-app
# npm install --save @nguniversal/module-map-ngfactory-loader
npm run build:ssr
npm run serve:ssr
```
# Angular Universal with NestJS
NestJS - An Introduction : https://academind.com/learn/node-js/nestjs-introduction/
```
ng add @nestjs/ng-universal
```

# Deploying Universal Apps
You can't deploy an Angular Universal app to a static host (i.e. Firebase Hosting, AWS S3 etc will NOT work).

The reason for this is, that you're using Node.js to pre-render pages on the server and those Hosts don't support Node.js.

Hence you need a host that does - for example AWS ElasticBeanstalk or Heroku.

To these hosts, you need to upload your dist/ folder along with the package.json file. On the web server, you then have to ensure that npm install is executed, followed by npm serve:ssr.

That's it - your app is now up and running on a web server!

Here's an example how you could host Universal apps via Firebase Cloud Functions (NOT Firebase Hosting): https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/15267340#questions/7482486


# Git

```
git add .
git remote add origin https://github.com/johnwr-response/atcg-reciepe-app.git
git push origin master
