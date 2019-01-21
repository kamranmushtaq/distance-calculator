export class CurrentGeolocation {
  public static getGeolocation(options?: any): Promise<Position> {
    if (window.navigator.geolocation) {
      /* https://gist.github.com/varmais/74586ec1854fe288d393 */
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
  }
}
