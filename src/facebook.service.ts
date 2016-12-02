import {Injectable} from '@angular/core';

interface Window {
    FB: any;
}

declare var window: Window;

declare var FB: any;

export interface FacebookDefaults {
    appId?: string,
    status?: boolean,
    xfbml?: boolean,
    version?: string,
}

export interface FacebookResolver {
    (): void
}

export interface FacebookCallback {
    (): void
}

@Injectable()
export class FacebookService {
    defaults: FacebookDefaults = {
        xfbml: false,
        version: 'v2.8'
    };

    script: HTMLScriptElement = null;

    resolver: FacebookResolver = null;

    promise: Promise<any> = null;

    constructor() {
        this.newPromise();
    }

    public init(params: FacebookDefaults = {}, lang: string = 'en_US') {
        if (!this.resolver) {
            this.newPromise();
        }

        params = Object.assign({}, this.defaults, params);

        this.loadScript('//connect.facebook.net/' + (lang || 'en_US') + '/sdk.js', () => {
            FB.init(params);

            Array.from(document.querySelectorAll('[fb-xfbml-state="rendered"]')).forEach(node => {
                FB.XFBML.parse(node.parentNode);
            });

            this.resolver();

            this.resolver = null;
        });

        return this.promise;
    }

    public parse(element: HTMLElement) {
        return this.promise.then(() => {
            FB.XFBML.parse(element);
        });
    }

    public then(callable: () => {}) {
        return this.promise.then(callable);
    }

    public catch(callable: () => {}) {
        return this.promise.catch(callable);
    }

    private newPromise() {
        this.promise = new Promise(res => {
            this.resolver = res;
        });
    }

    private loadScript(src: string, callback: FacebookCallback) {
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

            this.script = null;
        }

        this.script = document.createElement('script');

        this.script.type = 'text/javascript';

        this.script.src = src;

        this.script.onload = callback;

        document.getElementsByTagName('head')[0].appendChild(this.script);
    }
}