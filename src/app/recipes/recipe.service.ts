import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";


// @Injectable({
//   providedIn: 'root'
// })
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Schnitzel',
    //   'A super-tasty Schnitzel - Just awesome!',
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   [
    //     new Ingredient('Meat',1),
    //     new Ingredient('French Fries',20)
    //   ]),
    // new Recipe(
    //   'Big Fat Burger',
    //   'What else you need to say?',
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [
    //     new Ingredient('Buns',2),
    //     new Ingredient('Meat',1)
    //   ]),
    // new Recipe(
    //   'Spaghetti',
    //   'Tasty Spaghetti!',
    //   'https://upload.wikimedia.org/wikipedia/commons/2/2a/Spaghetti_al_Pomodoro.JPG',
    //   [
    //     new Ingredient('Spaghetti',100),
    //     new Ingredient('Tomatoes',3),
    //   ])
  ];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
