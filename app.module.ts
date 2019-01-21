import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlaceComponent } from "./place/place.component";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core"; // @agm/core
import { AgmDirectionModule } from "agm-direction"; // agm-direction
import { AngularFireModule } from "@angular/fire";

import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatStepperModule
} from "@angular/material";

@NgModule({
  declarations: [AppComponent, PlaceComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatStepperModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDuO-ZNrTCflkNMRLtHARvimLDZJlSny8U"
    }),
    AgmDirectionModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
