/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from "@angular/core";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { HttpClient } from "@angular/common/http";
import { Options } from "../options.model";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { CurrentGeolocation } from "../current-geolocation";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-place",
  templateUrl: "./place.component.html",
  styleUrls: ["./place.component.css"]
})
export class PlaceComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild("placesRef") places: GooglePlaceDirective;

  mapRef: google.maps.Map;
  bounds: google.maps.LatLngBounds;
  latLng: google.maps.LatLng;
  directionService: google.maps.DirectionsService;

  public options: Options = new Options();
  public disabled: boolean = true;
  public loading: boolean = true;
  showTable: boolean = false;
  origin_lat = 24.794833;
  origin_lng = 67.04920400000003;

  destination_lat = 24.9393424;
  destination_lng = 67.156173;
  distance: number = 0;
  fare: number = 0;
  currency = "$";
  fareUnitPrice: number = 2;
  travelTime: String = "0 mins";
  origin: any;
  destination: any;

  panelOpenState = false;

  constructor(public _formBuilder: FormBuilder, public http: HttpClient) {
    this.options.types = ["establishment"];

    CurrentGeolocation.getGeolocation().then((position: Position) => {
      this.options.setBounds(
        position.coords.latitude,
        position.coords.longitude
      );
      this.places.reset();
      this.disabled = false;
      this.loading = false;
    });
  }

  // getDirection() {
  //   console.log("get Direction Run");
  //   this.origin = { lat: this.origin_lat, lng: this.origin_lng };
  //   this.destination = { lat: this.destination_lat, lng: this.destination_lng };
  //   // this.origin = 'Taipei Main Station'
  //   // this.destination = 'Taiwan Presidential Office'

  //   // Set destination, origin and travel mode.
  //   var request: google.maps.DirectionsRequest = {
  //     origin: this.origin,
  //     destination: this.destination,
  //     travelMode: google.maps.TravelMode.DRIVING
  //   };
  //   console.log("request : " + request.origin);

  //   // Pass the directions request to the directions service.
  //   var directionsService = new google.maps.DirectionsService();
  //   directionsService.route(request, function(response, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       // Display the route on the map.
  //       console.log(response);
  //     } else {
  //       console.log("not OK !" + status);
  //     }
  //   });
  // }

  ngOnInit() {
    this.showTable = false;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.calculateDistance();
    // this.getDirection();
  }

  calculateDistance() {
    this.origin = { lat: this.origin_lat, lng: this.origin_lng };
    this.destination = { lat: this.destination_lat, lng: this.destination_lng };
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [this.origin],
        destinations: [this.destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      this.callback
    );
  }

  callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      // $('#result').html(err);
      // console.log(err)
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        console.log(
          "Better get on a plane. There are no roads between " +
            origin +
            " and " +
            destination
        );
      } else {
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;
        this.fareUnitPrice = 0.1526;
        var distance_value = distance.value;
        var duration_text = duration.text;
        this.distance = distance_value / 1000;
        this.travelTime = duration_text;
        this.fare = Number(this.fareUnitPrice) * Number(this.distance);
        console.log(
          "It is " + this.distance + " km from " + origin + " to " + destination
        );
        this.showTable = true;
      }
    }
  }

  public handleOriginChange(address: Address) {
    console.log(this.options.bounds);
    console.log(address);
    this.origin_lat = address.geometry.location.lat();
    this.origin_lng = address.geometry.location.lng();
    console.log(this.origin_lat);
    console.log(this.origin_lng);
  }

  public handleDestinationChange(address: Address) {
    console.log(this.options.bounds);
    console.log(address);
    this.destination_lat = address.geometry.location.lat();
    this.destination_lng = address.geometry.location.lng();
    console.log(this.destination_lat);
    console.log(this.destination_lng);
    // this.calculateDistance();
  }
}
