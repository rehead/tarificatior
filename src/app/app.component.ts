import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './service/api/api.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ipRequestsPerMinute = 150;

  ipsData: Array<{
    ip: string,
    requestCount: number
  }> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.initMap();

    this.apiService.getIpsData().subscribe((data: Array<any>) => {
      data.forEach((ipData) => {
        this.ipsData.push({
          ip: ipData[0],
          requestCount: ipData[1]
        });
      });

      this.drawMarkers();
    });
  }

  initMap() {
    const mapProp = {
      zoom: 2,
      center: new google.maps.LatLng(30, 2.213749000000007),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  drawMarkers() {
    const ipsPerMinuteData = this.ipsData.splice(0, this.ipRequestsPerMinute);

    ipsPerMinuteData.forEach((ipData, index) => {
      this.apiService.getCoordinates(ipData.ip).subscribe((data) => {
        if (data.lat && data.lon) {
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.lat, data.lon),
            map: this.map,
            title:  'ip: ' + ipData.ip + ', requests: ' + ipData.requestCount
          });
        }

        if ((index === ipsPerMinuteData.length - 1) && this.ipsData.length) {
          setTimeout(() => {
            this.drawMarkers();
          }, 60001);
        }
      });
    });
  }
}
