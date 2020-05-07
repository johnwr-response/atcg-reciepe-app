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

# Firebase Setup
  - Create database
    - https://ngcg-recipe-book.firebaseio.com/


# Git

```
git add .
git remote add origin https://github.com/johnwr-response/atcg-reciepe-app.git
git push origin master
