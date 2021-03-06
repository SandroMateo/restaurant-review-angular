import { Component, Input, Output } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { Review } from './review.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="jumbotron">
      <div class = "row">
        <div class = "col-md-2 well filter">
          <restaurant-filter
            [childSpecialtyList] = "allSpecialties"
            (specialtySender) = "selectSpecialty($event)"
            (ratingSender) = "selectRating($event)"
            (costSender) = "selectCost($event)"
          ></restaurant-filter>
        </div>
        <div class = "col-md-10">
          <h1>Restaurant Reviewer</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <restaurant-list
          [childRestaurantList] = "allRestaurants"
          [specialtyFilter] = "selectedSpecialty"
          [ratingFilter] = "selectedRating"
          [costFilter] = "selectedCost"
          [reviewList] = "allReviews"
          (editButtonSender)= "showDetails($event)"
        ></restaurant-list>
      </div>
      <div class="col-md-4 forms">
        <button class="btn" id="add-restaurant"(click)="showRestaurantForm()">Add Restaurant</button>
        <br><br>
        <new-restaurant
          [childRestaurantList] = "allRestaurants"
          [show] = "showNewForm"
          (newRestaurantSender) = "addRestaurant($event)"
        ></new-restaurant>
        <edit-restaurant
          [childSelectedRestaurant] = "selectedRestaurant"
          (clickSender) = "finishedEditing()"
        ></edit-restaurant>
      </div>
    </div>
  </div>
  `
})

export class AppComponent {
  allRestaurants: Restaurant[] = [
    new Restaurant("Joe's Pizza", "Pizza", "1234 N 15th", 2, 0, "https://s3-media3.fl.yelpcdn.com/bphoto/p3_DBtzBdy82bNB5iog7jQ/o.jpg"),
    new Restaurant("Augustine's Pizza", "Pizza", "132 Croton Ave.", 4, 1, "https://i.ytimg.com/vi/70R2DNL4EmQ/maxresdefault.jpg"),
    new Restaurant("Nong's Khao Man Gai", "Thai", "609 SE Ankeny St, Suite C", 4, 2,  "http://pica.org/wp-content/uploads/2012/09/TBA12_Nongs_960.jpg"),
    new Restaurant("Fuego Burrito", "Burritos", "Many Locations", 3, 3, "http://roaminghunger.com/img/trucks/original/5882/56b10981-7d64-4b3e-9c8a-4c5246204482.jpg")
  ];

  allReviews: Review[] = [];
  allSpecialties: string[] = ["Pizza", "Thai", "Burritos"];

  selectedRestaurant: Restaurant = null;
  selectedSpecialty: string = "All";
  selectedRating: number = 0;
  selectedCost: number = 5;
  showNewForm: boolean = false;

  showDetails(clickedRestaurant: Restaurant) {
    this.selectedRestaurant = clickedRestaurant;
    this.showNewForm = false;
  }

  finishedEditing() {
    this.selectedRestaurant.setDollarSigns();
    this.selectedRestaurant = null;
  }

  addRestaurant(newRestaurantFromChild: Restaurant) {
    newRestaurantFromChild.setDollarSigns();
    this.allRestaurants.push(newRestaurantFromChild);
    this.showNewForm = false;
    if(this.allSpecialties.indexOf(newRestaurantFromChild.specialty) === -1) {
      this.allSpecialties.push(newRestaurantFromChild.specialty);
    }
  }

  selectSpecialty(childSelectedSpecialty: string) {
    this.selectedSpecialty = childSelectedSpecialty;
  }

  selectRating(childSelectedRating: number) {
    this.selectedRating = childSelectedRating;
  }

  selectCost(childSelectedCost: number) {
    this.selectedCost = childSelectedCost;
  }

  showRestaurantForm() {
    this.showNewForm = true;
    this.selectedRestaurant = null;
  }

}
