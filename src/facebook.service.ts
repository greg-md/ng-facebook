import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface FacebookInitParams {
  appId?: string;
  status?: boolean;
  xfbml?: boolean;
  version?: string;
}

export interface FacebookAuth {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

export interface FacebookLoginResponse {
  status: string;
  authResponse: FacebookAuth;
}

export interface FacebookLoginOptions {
  auth_type?: 'rerequest';
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  profile_selector_ids?: string;
}

export interface FacebookApiError {
  message: string;
}

export const enum FacebookApiMethod {
  Get = 'get',
  Post = 'post',
  Delete = 'delete',
}

export interface FacebookApiParams {
  [propName: string]: any;
}

export interface FacebookApiCallback {
  (response?: {
    error?: FacebookApiError;
    [propName: string]: any;
  }): void;
}

export interface Facebook {
  XFBML: {
    parse: (element: HTMLElement, cb?: () => void) => void;
  };

  init: (params: FacebookInitParams) => void;

  login: (callback?: (response: FacebookLoginResponse) => void, options?: FacebookLoginOptions) => void;

  api: (path: string, method?: FacebookApiMethod | FacebookApiParams | FacebookApiCallback, params?: FacebookApiParams | FacebookApiCallback, callback?: FacebookApiCallback) => void;
}

export const FACEBOOK_DEFAULTS: FacebookInitParams = {
  xfbml: false,
  version: 'v2.10'
};

declare const FB: Facebook;

declare const window: {
  FB: Facebook;
};

@Injectable()
export class FacebookService {
  sdk = new ReplaySubject<Facebook>(1);

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
  }

  load(locale: string = 'en_US'): Observable<Facebook> {
    return Observable.create(subscriber => {
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

        script.src = '//connect.facebook.net/' + (locale || 'en_US') + '/sdk.js';

        script.onload = () => {
          this.ngZone.run(() => {
            subscriber.next(FB);

            subscriber.complete();
          });
        };

        script.onerror = () => {
          this.ngZone.run(() => {
            subscriber.error('Facebook SDK could not be loaded.');

            subscriber.complete();
          });
        };

        document.head.appendChild(script);
      });
    }).map(sdk => {
      this.sdk.next(sdk);

      return sdk;
    });
  }

  init(params: FacebookInitParams = {}, locale: string = 'en_US') {
    return this.load(locale).do<Facebook>(sdk => {
      params = Object.assign({}, FACEBOOK_DEFAULTS, params);

      sdk.init(params);

      this.reloadRenderedElements().subscribe();
    });
  }

  login(options?: FacebookLoginOptions): Observable<FacebookAuth> {
    return Observable.create(subscriber => {
      this.sdk.subscribe(sdk => {
        this.ngZone.runOutsideAngular(() => {
          sdk.login(response => {
            this.ngZone.run(() => {
              if (response.authResponse) {
                subscriber.next(response.authResponse);
              } else {
                subscriber.error(response);
              }

              subscriber.complete();
            });
          }, options);
        });
      });
    });
  }

  api(path: string, method?: FacebookApiMethod | FacebookApiParams, params?: FacebookApiParams): Observable<Object> {
    return Observable.create(subscriber => {
      this.sdk.subscribe(sdk => {
        this.ngZone.runOutsideAngular(() => {
          sdk.api(path, method, params, response => {
            this.ngZone.run(() => {
              if (response && !response.error) {
                subscriber.next(response);
              } else {
                subscriber.error(response ? response.error : null);
              }

              subscriber.complete();
            });
          });
        });
      });
    });
  }

  parse(element: HTMLElement): Observable<HTMLElement> {
    return Observable.create(subscriber => {
      this.sdk.subscribe(sdk => {
        this.ngZone.runOutsideAngular(() => {
          sdk.XFBML.parse(element, () => {
            this.ngZone.run(() => {
              subscriber.next(element);

              subscriber.complete();
            });
          });
        });
      });
    });
  }

  reloadRenderedElements(): Observable<HTMLElement> {
    return Observable.create(subscriber => {
      this.sdk.subscribe(sdk => {
        let elements = document.querySelectorAll('[fb-xfbml-state="rendered"]');

        let processing = elements.length;

        Array.from(elements).forEach(node => {
          this.ngZone.runOutsideAngular(() => {
            sdk.XFBML.parse(node.parentElement, () => {
              this.ngZone.run(() => {
                --processing;

                subscriber.next(node.parentElement);

                if (processing <= 0) {
                  subscriber.complete();
                }
              });
            });
          });
        });
      });
    });
  }
}
