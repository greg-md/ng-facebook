import {Component, Input, ElementRef, AfterViewInit, Renderer2, InjectionToken, Inject, Optional} from '@angular/core';

import {FacebookService} from './facebook.service';

import {FacebookParseDirective, FB_PARSE_THRESHOLD} from './parse.directive';

@Component({
  selector: 'fb-page',
  styles: [],
  template: `
    <div class="fb-page"
      [attr.data-href]="href"
      [attr.data-width]="width"
      [attr.data-height]="height"
      [attr.data-tabs]="tabs"
      [attr.data-hide-cover]="hideCover"
      [attr.data-show-facepile]="showFacepile"
      [attr.data-hide-cta]="hideCta"
      [attr.data-small-header]="smallHeader"
      [attr.data-adapt-container-width]="adaptContainerWidth"
    >
      <blockquote [attr.cite]="href" class="fb-xfbml-parse-ignore">
        <a [href]="href"><ng-content></ng-content></a>
      </blockquote>
    </div>
  `,
})
export class FacebookPageComponent extends FacebookParseDirective {
  @Input() href: string;
  @Input() width: number = 340;
  @Input() height: number = 500;
  @Input() tabs: string = 'timeline';
  @Input('hide-cover') hideCover: boolean = false;
  @Input('show-facepile') showFacepile: boolean = true;
  @Input('hide-cta') hideCta: boolean = false;
  @Input('small-header') smallHeader: boolean = false;
  @Input('adapt-container-width') adaptContainerWidth: boolean = true;

  constructor(
    elementRef: ElementRef,
    facebook: FacebookService,
    renderer: Renderer2,
    @Optional() @Inject(FB_PARSE_THRESHOLD) thresold: number
  ) {
    super(elementRef, facebook, renderer, thresold);
  }
}
