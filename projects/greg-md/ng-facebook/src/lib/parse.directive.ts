import {
  Directive, Input, ElementRef, AfterViewInit, Renderer2, InjectionToken, Inject, Optional,
  PLATFORM_ID, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { inViewport } from './dom';

import { FacebookService } from './facebook.service';

export const FB_PARSE_LAZY_LOAD = new InjectionToken<string>('fb_parse_lazy_load');

@Directive({
  selector: '[fbParse]',
})
export class FacebookParseDirective implements AfterViewInit, OnDestroy {
  @Input()
  set lazyLoad(threshold: number) {
    this.threshold = threshold;
  }

  @Input()
  container: HTMLElement | Window;

  scrollUnload: () => void;
  resizeUnload: () => void;

  constructor(
    private elementRef: ElementRef,
    private facebook: FacebookService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(FB_PARSE_LAZY_LOAD) private threshold: number,
  ) {
  }

  ngAfterViewInit() {
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
    if (
      isPlatformBrowser(this.platformId) && inViewport(this.elementRef.nativeElement, {
        threshold: this.threshold,
        container: this.container
      })
    ) {
      this.load();

      this.unloadListeners();
    }
  }

  load() {
    this.facebook.parse(this.elementRef.nativeElement).subscribe();
  }

  unloadListeners() {
    if (this.scrollUnload) {
      this.scrollUnload();
    }

    if (this.resizeUnload) {
      this.resizeUnload();
    }
  }
}
