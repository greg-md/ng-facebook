import {
  Component, Input, ElementRef, Renderer2, Inject, Optional, ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';

import { FacebookService } from './facebook.service';

import { FacebookParseDirective, FB_PARSE_LAZY_LOAD } from './parse.directive';

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
        <a [href]="href">
          <ng-content></ng-content>
        </a>
      </blockquote>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookPageComponent extends FacebookParseDirective {
  @Input() href: string;
  @Input() width = 340;
  @Input() height = 500;
  @Input() tabs = 'timeline';
  @Input() hideCover = false;
  @Input() showFacepile = true;
  @Input() hideCta = false;
  @Input() smallHeader = false;
  @Input() adaptContainerWidth = true;

  constructor(
    elementRef: ElementRef,
    facebook: FacebookService,
    renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(FB_PARSE_LAZY_LOAD) threshold: number
  ) {
    super(elementRef, facebook, renderer, platformId, threshold);
  }
}
