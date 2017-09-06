import {Injectable, InjectionToken, NgZone} from '@angular/core';

declare const window: {
  FB: any;
};

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

@Injectable()
export class FacebookService {
  private defaults: FacebookDefaults = {
    xfbml: false,
    version: 'v2.8'
  };

  private script: HTMLScriptElement;

  private _promise: Promise<any>;

  private resolver: () => void;

  get sdk(): Facebook {
    return FB;
  }

  constructor(private ngZone: NgZone) {}

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
    this.ngZone.runOutsideAngular(() => {
      if (this.script) {
        delete window.FB;

        let jsSdk: HTMLElement, fbRoot: HTMLElement;

        if (jsSdk = document.getElementById('facebook-jssdk')) {
          jsSdk.parentNode.removeChild(jsSdk);
        }

        if (fbRoot = document.getElementById('fb-root')) {
          fbRoot.parentNode.removeChild(fbRoot);
        }

        this.script.parentNode.removeChild(this.script);
      }

      this.script = document.createElement('script');

      this.script.type = 'text/javascript';

      this.script.src = src;

      this.script.onload = callback;

      document.getElementsByTagName('head')[0].appendChild(this.script);
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
