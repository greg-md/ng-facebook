# Facebook sdk for Angular2

Using Facebook sdk with Angular2

## Features

1. Multi-Language initialization support;
2. Lazy loading plugins when they appears in viewport;
3. 

## Installation

```bash
npm install @greg-md/ng-facebook --save
```

## Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import Facebook module.
import { FacebookModule } from '@greg-md/ng-facebook';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Import Facebook module with providers.
    FacebookModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Using in components/views

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

## Directives

## License

MIT © [Grigorii Duca](http://greg.md)
