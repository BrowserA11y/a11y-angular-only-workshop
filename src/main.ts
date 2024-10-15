import { A11yModule } from "@angular/cdk/a11y";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { routes } from "./routes";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, A11yModule),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
