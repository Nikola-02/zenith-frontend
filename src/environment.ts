import { HttpHeaders } from '@angular/common/http';

export const environment = {
  apiUrl: 'http://localhost:5001/api/',
};

export const noAuthOptions = {
  headers: new HttpHeaders({
    'No-Auth': 'True',
  }),
};
