import { Injectable, IterableDiffers } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApisService {
  url = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  //add user
  newEmployee(data: any): Observable<any> {
    return this._http.post(this.url + '/employees', data);
  }

  //display users
  getAllEmployee(): Observable<any> {
    return this._http.get(this.url + '/employees');
  }

  // delete selected items
  deleteSelectedItems(selectedItems: any[]): Observable<any> {
    const deleteRequests: Observable<any>[] = [];

    for (const item of selectedItems) {
      const deleteRequest = this._http.delete(
        this.url + '/employees/' + item.id
      );
      deleteRequests.push(deleteRequest);
    }

    return forkJoin(deleteRequests);
  }
  //edit item
  editSelectedItem(selectedItem: any): Observable<any> {
    const itemId = selectedItem.id;
    console.log('ggggggggggggggg', itemId);
    const editRequest = this._http.put(
      this.url + '/employees/' + itemId,
      selectedItem
    );

    return editRequest;
  }
}
