/* https://stackoverflow.com/a/42177083/437459 */
declare var google;

import { Options as PlacesOptions } from "ngx-google-places-autocomplete/objects/options/options";
import { ComponentRestrictions } from "ngx-google-places-autocomplete/objects/options/componentRestrictions";

export class Options extends PlacesOptions {
  public componentRestrictions: ComponentRestrictions = new ComponentRestrictions(
    {
      country: "PK"
    }
  );

  /* constructor(opt?: Partial<PlacesOptions>) {
        super(opt);
    } */

  setBounds(lat: number, lng: number): void {
    this.bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng({ lat, lng })
    );
  }
}
