import {Directive, Input, ElementRef, AfterViewInit, Renderer2, InjectionToken, Inject, Optional} from '@angular/core';

import {inViewport} from './facebook.utils';

import {FacebookService} from './facebook.service';

export const FB_PARSE_LAZY_LOAD = new InjectionToken<string>('fb_parse_lazy_load');

@Directive({
  selector: '[fb-parse]',
})
export class FacebookParseDirective implements AfterViewInit {
  private _threshold: number;

  @Input('lazy-load') set threshold(threshold: number) {
    if (threshold === null || (typeof threshold === 'string' && threshold === '')) {
      this._threshold = null;
    } else {
      this._threshold = parseInt(threshold + '');
    }
  }

  get threshold(): number {
    return this._threshold;
  }

  @Input() container: HTMLElement | Window;

  scrollUnload: () => void;
  resizeUnload: () => void;

  constructor(
    private elementRef: ElementRef,
    private facebook: FacebookService,
    private renderer: Renderer2,
    @Optional() @Inject(FB_PARSE_LAZY_LOAD) thresold: number
  ) {
    this.threshold = thresold;
  }

  ngAfterViewInit() {
    if (this.threshold === null) {
      this.load();
    } else {
      this.lazyLoad();
    }
  }

  load() {
    this.facebook.parse(this.elementRef.nativeElement);
  }

  tryLoading() {
    if (inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container})) {
      this.load();

      this.scrollUnload && this.scrollUnload();
      this.resizeUnload && this.resizeUnload();
    }
  }

  lazyLoad() {
    let tryLoading = () => {
      this.tryLoading();
    };

    this.scrollUnload = this.renderer.listen('window', 'scroll', tryLoading);
    this.resizeUnload = this.renderer.listen('window', 'resize', tryLoading);

    setTimeout(tryLoading);
  }
}
