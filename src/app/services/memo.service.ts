import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Memo } from '../models/Memo.model';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private memos: Observable<Memo[]>;
  private memoCollection: AngularFirestoreCollection<Memo>;

  constructor(private afs: AngularFirestore) { 

    this.memoCollection = this.afs.collection<Memo>('memos');
    this.memos = this.memoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        })
      })
    );

  }

  getMemos(): Observable<Memo[]> {
    return this.memos;
  }

  getMemo(id: string): Observable<Memo> {
    return this.memoCollection.doc<Memo>(id).valueChanges().pipe(
      take(1),
      map(memo => {
        memo.id = id;
        return memo;
      })
    );
  }

  addMemo(memo: Memo): Promise<DocumentReference> {
    return this.memoCollection.add(memo);
  }

  updateMemo(memo: Memo): Promise<void> {
    return this.memoCollection.doc(memo.id).update(memo);
  }

  deleteMemo(id: string): Promise<void> {
    return this.memoCollection.doc(id).delete();
  }
}
