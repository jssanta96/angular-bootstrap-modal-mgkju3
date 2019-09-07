import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Lesson } from "../models/lesson.model";
import { Person } from "../models/Person";
import {Departamento} from "../models/Departamento";

@Injectable()
export class FirestoreService {

  personCollection: AngularFirestoreCollection<Person>;
  personDoc: AngularFirestoreDocument<Person>;
  persons: Observable<Person[]>;
  person: Observable<Person>;

  departamentoCollection : AngularFirestoreCollection<Departamento>;
  departamentoDoc: AngularFirestoreDocument<Departamento>;
  departamentos: Observable<Departamento[]>;
  departamento: Observable<Departamento>;
  constructor(private afStore: AngularFirestore) {
    this.personCollection = afStore.collection<Person>('persons');
    this.departamentoCollection = afStore.collection<Departamento>('departamentos');
  }
 
  getPersons(): Observable<Person[]> {
    
    this.persons = this.personCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
  
        const data = a.payload.doc.data() as Person;
        data.id = a.payload.doc.id;
       
        return data;
      });
    });
    return this.persons;
  }

    getDepartamentos(): Observable<Departamento[]> {
    
    this.departamentos = this.departamentoCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        
        const data = a.payload.doc.data() as Departamento;
        data.id = a.payload.doc.id;
        
        return data;
      });
    });
    return this.departamentos;
  }

  
}

