import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AuthResponseData, AuthService} from "./auth.service";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObservable = this.authService.login(email,password);
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }))
    } else {
      authObservable = this.authService.signUp(email,password)
    }


    // authObservable.subscribe(responseData => {
    //   console.log(responseData);
    //   this.isLoading = false;
    //   this.error = null;
    //   this.router.navigate(['/recipes']);
    // }, errorMessage => {
    //   console.log(errorMessage);
    //   this.error = errorMessage;
    //   this.showErrorAlert(errorMessage);
    //   this.isLoading = false;
    // });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentReference = hostViewContainerRef.createComponent(alertComponentFactory);

    componentReference.instance.message = message;
    this.closeSub = componentReference.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
