import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";

// @Injectable({
//   providedIn: 'root'
// })
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
