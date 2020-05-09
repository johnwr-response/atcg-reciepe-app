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



# Git

```
git add .
git remote add origin https://github.com/johnwr-response/atcg-reciepe-app.git
git push origin master
