import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const role = localStorage.getItem('role');
    if(!role){
      localStorage.setItem('role', 'guest');
    }

  const authToken = localStorage.getItem('token');
  var token 
if(authToken){
   token = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
}else{
  token = req.clone({
    setHeaders: {
      
    }
  });
}

    const authReq = token

  // Clone the request and add the authorization header


  // Pass the cloned request with the updated header to the next handler

  return next(authReq).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // Access and store desired response headers here
        const responseHeaders = event.headers;
        // Example: store a specific header
        const customHeaderValue = responseHeaders.get('X-Tier-Status');
        
      }
    }),
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );;
};
