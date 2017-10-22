import {
  Directive, Input, ElementRef, AfterContentInit, Renderer2, InjectionToken, Inject, Optional,
  OnDestroy
} from '@angular/core';

import { inViewport } from './facebook.utils';

import { FacebookService } from './facebook.service';

export const FB_PARSE_LAZY_LOAD = new InjectionToken<string>('fb_parse_lazy_load');

@Directive({
  selector: '[fb-parse]',
})
export class FacebookParseDirective implements AfterContentInit, OnDestroy {
  private _threshold: number;

  @Input('lazy-load')
  set threshold(threshold: number) {
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

  ngAfterContentInit() {
    if (this.threshold === null) {
      this.load();
    } else {
      this.initListeners();

      this.tryLoading();
    }
  }

  ngOnDestroy() {
    this.unloadListeners();
  }

  initListeners() {
    this.scrollUnload = this.renderer.listen('window', 'scroll', () => {
      this.tryLoading();
    });

    this.resizeUnload = this.renderer.listen('window', 'resize', () => {
      this.tryLoading();
    });
  }

  tryLoading() {
    if (inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container})) {
      this.load();

      this.unloadListeners();
    }
  }

  load() {
    this.facebook.parse(this.elementRef.nativeElement).subscribe();
  }

  unloadListeners() {
    this.scrollUnload && this.scrollUnload();
    this.resizeUnload && this.resizeUnload();
  }
}
