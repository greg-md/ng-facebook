import {Injectable} from '@angular/core';

interface Window {
    FB: any;
}

declare const window: Window;

export interface Facebook {
    XFBML: {
        parse: (HTMLElement) => void;
    };

    init: (FacebookDefaults) => void;
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

    private _promise: Promise<any> = null;

    private resolver: () => void = null;

    private _tmpPromise: Promise<any> = null;

    private tmpResolver: (() => void) | boolean = null;

    public init(params: FacebookDefaults = {}, lang: string = 'en_US') {
        params = Object.assign({}, this.defaults, params);

        this.loadScript('//connect.facebook.net/' + (lang || 'en_US') + '/sdk.js', () => {
            this.sdk.init(params);

            this.reloadRendered();

            this.resolve();
        });

        return this;
    }

    get sdk(): Facebook {
        return FB;
    }

    parse(element: HTMLElement) {
        if (element) {
            this.tmpPromise = this.tmpPromise.then(() => {
                this.sdk.XFBML.parse(element);
            });
        }

        return this;
    }

    then(callable: () => void) {
        this.promise = this.promise.then(() => {
            callable();
        });

        return this;
    }

    catch(callable: () => void) {
        this.promise = this.promise.catch(() => {
            callable();
        });

        return this;
    }

    private resolve() {
        if (!this.resolver) {
            this.newPromise();
        }

        this.resolver();

        // Tmp resolver
        if (this.tmpResolver === null) {
            this.newTmpPromise();
        }

        if (this.tmpResolver && (typeof this.tmpResolver !== 'boolean')) {
            this.tmpResolver();

            this.tmpResolver = true;

            this.tmpPromise = Promise.resolve(true);
        }
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

    private get tmpPromise() {
        if (!this._tmpPromise) {
            this.newTmpPromise();
        }

        return this._tmpPromise;
    }

    private set tmpPromise(promise: Promise<any>) {
        this._tmpPromise = promise;
    }

    private newTmpPromise() {
        this.tmpPromise = new Promise(res => {
            this.tmpResolver = res;
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