import {Directive, OnInit, Input, ElementRef, AfterViewInit} from '@angular/core';

import { inViewport } from './facebook.utils';

import { FacebookService } from './facebook.service';

@Directive({
  selector: '[gg-fb-parse]',
})
export class FacebookParseDirective implements OnInit, AfterViewInit {
  @Input('lazy-load') lazyLoad: boolean = true;

  @Input() threshold: number = 0;

  @Input() container: HTMLElement | Window;

  tryLoading = () => {
    if (inViewport(this.elementRef.nativeElement, {threshold: this.threshold, container: this.container})) {
      this.load();

      window.removeEventListener('scroll', this.tryLoading);
      window.removeEventListener('resize', this.tryLoading);
    }
  };

  constructor(private elementRef: ElementRef, private fb: FacebookService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.lazyLoad) {
      this.initLazyLoad();
    } else {
      this.load();
    }
  }

  initLazyLoad() {
    window.addEventListener('scroll', this.tryLoading);
    window.addEventListener('resize', this.tryLoading);

    this.tryLoading();
  }

  load() {
    this.fb.parse(this.elementRef.nativeElement);
  }
}
