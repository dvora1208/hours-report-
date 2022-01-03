import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class StreetService {

    private street: any[] = [
        { id: 1, name: 'בן יהודה' },
        { id: 2, name: 'כנפי נשרים' },
        { id: 3, name: 'ירמיהו' },
        { id: 4, name: 'בגין' },
        { id: 5, name: 'יפו' },
    ]
    constructor(
        private http: ApiService,
    ) { }

    getStreet() {
        return this.street;
    }
}

