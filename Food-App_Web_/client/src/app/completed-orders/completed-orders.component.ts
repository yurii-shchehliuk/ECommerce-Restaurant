import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@aspnet/signalr';
import { CompletedOrdersService } from './completed-orders.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss'],
})
export class CompletedOrdersComponent implements OnInit {
  orders: any;
  constructor(private service: CompletedOrdersService) {}

  ngOnInit(): void {
    this.service.getOrders().subscribe(
      (res) => {
        this.orders = res;
      },
      (err) => {
        console.log('getOrders', err);
      }
    );
  }
  exportData() {
    const blob = new Blob([JSON.stringify(this.orders, null, 2)], {
      type: 'application/json',
    });
    this.download(blob, 'fileName.json');
  }
  download(blob, filename) {
    var a = document.createElement('a'),
      url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
