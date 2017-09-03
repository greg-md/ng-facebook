import {Directive, Input, ElementRef, AfterViewInit, Renderer2} from '@angular/core';

import {inViewport} from './facebook.utils';

import {FacebookService} from './facebook.service';

@Directive({
  selector: '[fb-parse]',
})
export class FacebookParseDirective implements AfterViewInit {
  private _threshold: number = 0;

  @Input() set threshold(threshold: number) { this._threshold = parseInt(threshold + ''); }

  get threshold(): number { return this._threshold; }

  @Input() container: HTMLElement | Window;

  scrollUnload: () => void;
  resizeUnload: () => void;

  constructor(
    private elementRef: ElementRef,
    private facebook: FacebookService,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit() {
    if (typeof this.threshold !== 'undefined') {
      this.lazyLoad();
    } else {
      this.load();
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
