import { Component } from '@angular/core';
import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private facebookService: FacebookService) {
    facebookService.init().subscribe();
  }
}
