import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on the way');
        // ADD A NEW HEADER TO THE ORIGINAL REQUEST BODY
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'xyz')})
        return next.handle(modifiedRequest)
        // return next.handle(req);
    }
}