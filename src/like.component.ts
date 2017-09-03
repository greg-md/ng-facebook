import {Component, Input, ElementRef, Renderer2, Inject, Optional} from '@angular/core';

import {FacebookService} from './facebook.service';

import {FacebookParseDirective, FB_PARSE_THRESHOLD} from './parse.directive';

@Component({
  selector: 'fb-like',
  styles: [],
  template: `
    <div class="fb-like" 
      [attr.data-action]="action"
      [attr.data-colorscheme]="colorscheme"
      [attr.data-href]="href"
      [attr.data-kid-directed-site]="kidDirectedSite"
      [attr.data-layout]="layout"
      [attr.data-ref]="ref"
      [attr.data-share]="share"
      [attr.data-show-faces]="showFaces"
      [attr.data-size]="size"
      [attr.data-width]="width"
    ><ng-content></ng-content></div>
  `,
})
export class FacebookLikeComponent extends FacebookParseDirective {
  @Input() action: 'like' | 'recommend' = 'like';
  @Input() colorscheme: 'light' | 'dark' = 'light';
  @Input() href: string;
  @Input('kid-directed-site') kidDirectedSite: boolean = false;
  @Input() layout: 'standard' | 'button_count' | 'button' | 'box_count' = 'standard';
  @Input() ref: string;
  @Input() share: boolean = false;
  @Input('show-faces') showFaces: boolean = false;
  @Input() size: 'large' | 'small' = 'small';
  @Input() width: number;

  constructor(
    elementRef: ElementRef,
    facebook: FacebookService,
    renderer: Renderer2,
    @Optional() @Inject(FB_PARSE_THRESHOLD) thresold: number
  ) {
    super(elementRef, facebook, renderer, thresold);
  }
}
