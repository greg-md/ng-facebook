import {Inject, Injectable, InjectionToken, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

export interface FacebookDefaults {
  appId?: string;
  status?: boolean;
  xfbml?: boolean;
  version?: string;
}

export interface FacebookLoginResponse {
  status: string;
  authResponse: {
    accessToken: string;
  };
}

export interface Facebook {
    XFBML: {
        parse: (element: Node) => void;
    };

    init: (params: FacebookDefaults) => void;
}

declare const FB: Facebook;

declare const window: {
  FB: Facebook;
};

@Injectable()
export class FacebookService {
  private defaults: FacebookDefaults = {
    xfbml: false,
    version: 'v2.8'
  };

  private _promise: Promise<any>;

  private resolver: () => void;

  get sdk(): Facebook {
    return FB;
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {}

  init(params: FacebookDefaults = {}, locale: string = 'en_US') {
    params = Object.assign({}, this.defaults, params);

    this.newResolve();

    this.loadScript('//connect.facebook.net/' + (locale || 'en_US') + '/sdk.js', () => {
      this.sdk.init(params);

      this.reloadRendered();

      this.resolve();
    });

    return this.promise;
  }

  parse(element: HTMLElement) {
    return this.promise.then(() => {
      this.sdk.XFBML.parse(element);
    });
  }

  then(callable) {
    return this.promise.then(callable);
  }

  catch(callable) {
    return this.promise.catch(callable);
  }

  private loadScript(src: string, callback: () => void) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      delete window.FB;

      let jsSdk: HTMLElement, fbRoot: HTMLElement;

      if (jsSdk = document.getElementById('facebook-jssdk')) {
        jsSdk.parentNode.removeChild(jsSdk);
      }

      if (fbRoot = document.getElementById('fb-root')) {
        fbRoot.parentNode.removeChild(fbRoot);
      }

      let script = document.createElement('script');

      script.id = 'facebook-jssdk';

      script.src = src;

      script.onload = callback;

      document.head.appendChild(script);
    });

    return this;
  }

  private reloadRendered() {
    Array.from(document.querySelectorAll('[fb-xfbml-state="rendered"]')).forEach(node => {
      this.sdk.XFBML.parse(node.parentNode);
    });
  }

  private newResolve() {
    if (!this.resolver) {
      this.newPromise();
    }
  }

  private resolve() {
    if (!this.resolver) {
      this.newPromise();
    }

    this.resolver();

    this.resolver = null;
  }

  private newPromise() {
    this._promise = new Promise(res => {
      this.resolver = res;
    });
  }

  private get promise() {
    if (!this._promise) {
      this.newPromise();
    }

    return this._promise;
  }
}
