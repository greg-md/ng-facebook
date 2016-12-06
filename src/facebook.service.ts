import {Injectable} from '@angular/core';

interface Window {
    FB: any;
}

declare const window: Window;

interface Facebook {
    XFBML: {
        parse: (HTMLElement) => void;
    };
}

declare const FB: Facebook;

export interface FacebookDefaults {
    appId?: string,
    status?: boolean,
    xfbml?: boolean,
    version?: string,
}

export interface FacebookLoginResponse {
    status: string,
    authResponse: {
        accessToken: string,
    },
}

@Injectable()
export class FacebookService {
    private defaults: FacebookDefaults = {
        xfbml: false,
        version: 'v2.8'
    };

    private script: HTMLScriptElement = null;

    private resolver: () => void = null;

    private _promise: Promise<any> = null;

    public init(params: FacebookDefaults = {}, lang: string = 'en_US') {
        params = Object.assign({}, this.defaults, params);

        this.loadScript('//connect.facebook.net/' + (lang || 'en_US') + '/sdk.js', () => {
            this.sdk.init(params);

            this.reloadRendered();

            if (!this.resolver) {
                this.newPromise();
            }

            this.resolver();
        });

        return this;
    }

    get sdk(): Facebook {
        return FB;
    }

    public parse(element: HTMLElement) {
        if (element) {
            this.promise.then(() => {
                this.sdk.XFBML.parse(element);
            });
        }

        return this;
    }

    public then(callable: () => void) {
        this.promise = this.promise.then(() => {
            callable();
        });

        return this;
    }

    public catch(callable: () => void) {
        this.promise = this.promise.catch(() => {
            callable();
        });

        return this;
    }

    private get promise() {
        if (!this._promise) {
            this.newPromise();
        }

        return this._promise;
    }

    private set promise(promise: Promise<any>) {
        this._promise = promise;
    }

    private newPromise() {
        this.promise = new Promise(res => {
            this.resolver = res;
        });

        return this;
    }

    private loadScript(src: string, callback: () => void) {
        if (!window) {
            return this;
        }

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

        return this;
    }

    private reloadRendered() {
        if (document) {
            Array.from(document.querySelectorAll('[fb-xfbml-state="rendered"]')).forEach(node => {
                this.sdk.XFBML.parse(node.parentNode);
            });
        }
    }
}