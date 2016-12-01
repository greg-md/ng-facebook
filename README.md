# ng-facebook

Facebook sdk for Angular2

## Installation

```bash
npm install @greg-md/ng-facebook --save
```

## Setting up in AppModule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { FacebookModule } from '@greg-md/ng-facebook';

@NgModule({
  imports: [
    BrowserModule,
    FacebookModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using in components

```typescript
import { Component, OnInit } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'app-root',
  template: `
    <div gg-fb-parse>
      <div class="fb-like" data-href="http://greg.md" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(public facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.init();
  }
}
```

## License

MIT © [Grigorii Duca](contact@greg.md)
