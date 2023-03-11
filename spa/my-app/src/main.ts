import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { start as singleSpaStart } from 'single-spa';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { AppModule } from './app/app.module';
import { PlatformLocation } from '@angular/common';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
singleSpaStart();
// название проекта

const appId = 'container-app';

// Так как наше приложение использует маршрутизацию, мне необходимо импортировать функцию getSingleSpaExtraProviders. 
platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule).then(module => {
    NgZone.isInAngularZone = () => {
    // @ts-ignore
        return window.Zone.current._properties[appId] === true;
    };
    const rootPlatformLocation = module.injector.get(PlatformLocation) as any;
    const rootZone = module.injector.get(NgZone);
    // tslint:disable-next-line:no-string-literal
    rootZone['_inner']._properties[appId] = true;
    rootPlatformLocation.setNgZone(rootZone);
})
.catch(err => {});