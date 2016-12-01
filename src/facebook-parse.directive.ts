import {Directive, HostListener, OnInit, Input, ElementRef, AfterViewInit} from '@angular/core';

import { inViewport } from './facebook.utils';

import { FacebookService } from './facebook.service';

@Directive({
  selector: '[gg-fb-parse]',
})
export class FacebookParseDirective implements OnInit, AfterViewInit {
  @Input() threshold: number = 0;

  constructor(private elementRef: ElementRef, private fb: FacebookService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.lazyload();
  }

  @HostListener('window:scroll') @HostListener('window:resize') lazyload() {
    if (inViewport(this.elementRef.nativeElement, {threshold: this.threshold})) {
      this.load();
    }
  }

  load() {
    this.lazyload = () => {};

    this.fb.parse(this.elementRef.nativeElement);
  }
}
