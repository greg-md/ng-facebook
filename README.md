# Ng Facebook

[![npm version](https://badge.fury.io/js/%40greg-md%2Fng-facebook.svg)](https://badge.fury.io/js/%40greg-md%2Fng-facebook)
[![Build Status](https://travis-ci.org/greg-md/ng-facebook.svg?branch=master)](https://travis-ci.org/greg-md/ng-facebook)

Using Facebook SDK with Angular.

# Table of Contents:

* [Features](#features)
* [Installation](#installation)
* [How It Works](#how-it-works)
* [Components](#components)
    * [fb-page](#fb-page) - Page Plugin;
    * [fb-like](#fb-like) - Like Button for the Web.
* [Directives](#directives)
    * [fb-parse](#fb-parse) - Parse facebook plugins.
* [Facebook Service](#facebook-service)
* [License](#license)
* [Huuuge Quote](#huuuge-quote)

# Features

1. Multi-Language initialization support with changing languages in real time;
2. Lazy loading Facebook plugins when they appears in viewport.

# Installation

```bash
npm install @greg-md/ng-facebook --save
```

# How It Works

## Setting up in a module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 1. Import Facebook module;
import { FacebookModule } from '@greg-md/ng-facebook';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // 2. Register Facebook providers in root module;
    FacebookModule.forRoot(),
    
    // 3. Import Facebook components for a specific module.
    FacebookModule,
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
    <a tabindex="0" (click)="changeLanguage('en_EN')">English</a>
    |
    <a tabindex="0" (click)="changeLanguage('ro_RO')">Romanian</a>
    
    <div fb-parse>
      <div class="fb-like"
        data-href="http://greg.md"
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-show-faces="true"
        data-share="true"></div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  constructor(public facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.init();
  }
  
  changeLanguage(newLanguage) {
    this.facebook.init({}, newLanguage);
  }
}
```

# Components

## fb-page

Page Plugin.

[Facebook Documentation](https://developers.facebook.com/docs/plugins/page-plugin).

_Example:_

```html
<fb-page href="https://www.facebook.com/facebook">Facebook</fb-page>
```

### Attributes

#### href

The URL of the Facebook Page.

#### width

The pixel width of the plugin. Min. is `180` & Max. is `500`.

Default: `340`.

#### height

The pixel height of the plugin. Min. is `70`.

Default: `500`.

#### tabs

Tabs to render i.e. `timeline`, `events`, `messages`.
Use a comma-separated list to add multiple tabs, i.e. `timeline, events`.

Default: `timeline`.

#### hide-cover

Hide cover photo in the header.

Default `false`.

#### show-facepile

Show profile photos when friends like this.

Default `true`.

#### hide-cta

Hide the custom call to action button (if available).

Default `false`.

#### small-header

Use the small header instead.

Default `false`.

#### adapt-container-width

Try to fit inside the container width.

Default `true`.

#### threshold

By default plugins are loaded when they appear on the screen.
If you want plugins to load earlier, use threshold parameter.
Setting threshold to `200` causes image to load 200 pixels before it appears on viewport.

#### container

You can use also use `threshold` attribute inside a scrolling container, such as div with scroll bar.

_Example:_

```html
<div #container>
  <fb-page href="https://www.facebook.com/facebook" threshold="200" [container]="container"></fb-page>
</div>
```

## fb-like

A single click on the Like button will 'like' pieces of content on the web and share them on Facebook.
You can also display a Share button next to the Like button to let people add a personal message and customize who they share with.

[Facebook Documentation](https://developers.facebook.com/docs/plugins/like-button).

_Example:_

```html
<fb-like href="http://greg.md"></fb-like>
```

### Attributes

#### action

The verb to display on the button. Can be either `like` or `recommend`.

Default: `like`.

#### colorscheme

The color scheme used by the plugin for any text outside of the button itself. Can be `light` or `dark`.

Default: `light`.

#### href

The absolute URL of the page that will be liked.

#### kid-directed-site

If your web site or online service, or a portion of your service,
is directed to children under 13 [you must enable this](https://developers.facebook.com/docs/plugins/restrictions/).

Default: `false`.

#### layout

Selects one of the different layouts that are available for the plugin.
Can be one of `standard`, `button_count`, `button` or `box_count`.

##### Layout Settings

| Layout        | Default Sizes |
| ------------- | ------------- |
| standard      | Minimum width: 225 pixels.<br>Default width: 450 pixels.<br>Height: 35 pixels (without photos) or 80 pixels (with photos).  |
| box_count     | Minimum width: 55 pixels.<br>Default width: 55 pixels.<br>Height: 65 pixels.  |
| button_count  | Minimum width: 90 pixels.<br>Default width: 90 pixels.<br>Height: 20 pixels.  |
| button        | Minimum width: 47 pixels.<br>Default width: 47 pixels.<br>Height: 20 pixels.  |

#### ref

A label for tracking referrals which must be less than 50 characters
and can contain alphanumeric characters and some punctuation (currently +/=-.:_).
See the [FAQ](https://developers.facebook.com/docs/plugins/faqs#ref) for more details.

#### share

Specifies whether to include a share button beside the Like button. This only works with the XFBML version.

Default: `false`.

#### show-faces

Specifies whether to display profile photos below the button (standard layout only).
You must not enable this on [child-directed sites](https://developers.facebook.com/docs/plugins/restrictions/).

Default: `false`.

### size

The button is offered in 2 sizes i.e. `large` and `small`.

Default: `small`.

#### width

The width of the plugin (standard layout only),
which is subject to the minimum and default width.
Please see [Layout Settings](#layout-settings) for more details.

# Directives

## fb-parse

Parse Facebook plugins from current container.

_Example:_

```html
<div fb-parse>
  <div class="fb-like"
    data-href="http://greg.md"
    data-layout="standard"
    data-action="like"
    data-size="small"
    data-show-faces="true"
    data-share="true"></div>
</div>
```

### Attributes

#### threshold

By default plugins are loaded when they appear on the screen.
If you want plugins to load earlier, use threshold parameter.
Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.

_Example:_

```html
<div fb-parse threshold="200">
  <div class="fb-like"
    data-href="http://greg.md"
    data-layout="standard"
    data-action="like"
    data-size="small"
    data-show-faces="true"
    data-share="true"></div>
</div>
```

#### container

You can also use directive for plugins inside scrolling container,
such as div with scroll bar. Just pass the container element.

_Example:_

```html
<div #container>
    <div fb-parse threshold="200" [container]="container">
      <div class="fb-like"
        data-href="http://greg.md"
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-show-faces="true"
        data-share="true"></div>
    </div>
</div>
```

# Facebook Service

`FacebookService` works directly with Facebook sdk.

## Methods

Below is a list of **supported methods**:

* [init](#init) - Load and initialize Facebook sdk;
* [parse](#parse) - Parse Facebook plugins from a HTMLElement;

## init

Load and initialize Facebook sdk.

```typescript
init(params: FacebookDefaults = {}, lang: string = 'en_US'): Promise
```

`params` - The same as [FB.init(params)](https://developers.facebook.com/docs/javascript/reference/FB.init/v2.8) parameters;  
`lang` - Facebook sdk language. See [Localization & Translation](https://developers.facebook.com/docs/internationalization).

_Example:_

```typescript
import { Injectable } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Injectable()
export class AppService {
  constructor(public facebook: FacebookService) { }

  loadAndInitFacebook() {
    return this.facebook.init();
  }
  
  changeFacebookSettings() {
    return this.facebook.init({
      appId : '{your-app-id}',
      version: 'v2.7'
    }, 'ro_RO');
  }
}
```

## parse

Parse Facebook plugins from a HTMLElement.

```typescript
parse(element: HTMLElement): Promise
```

`element` - An HTMLElement.

_Example:_

```typescript
import { Component, OnInit, ElementRef } from '@angular/core';

import { FacebookService } from '@greg-md/ng-facebook';

@Component({
  selector: 'facebook-page',
  template: `
    <h2>We on Facebook!</h2>
    
    <div class="fb-page" 
      data-href="https://www.facebook.com/facebook"
      data-width="380" 
      data-hide-cover="false"
      data-show-facepile="false" 
      data-show-posts="false"></div>
  `,
})
export class WidgetComponent implements OnInit {
  constructor(private: elementRef: ElementRef, private facebook: FacebookService) { }

  ngOnInit() {
    this.facebook.parse(this.elementRef.nativeElement);
  }
}
```

# License

MIT © [Grigorii Duca](http://greg.md)

# Huuuge Quote

![I fear not the man who has practiced 10,000 programming languages once, but I fear the man who has practiced one programming language 10,000 times. #horrorsquad](http://greg.md/huuuge-quote-fb.jpg)
