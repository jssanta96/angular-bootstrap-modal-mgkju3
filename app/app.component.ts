import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from "./service/firestore.service";
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lesson } from "./models/lesson.model";
import {Person} from "./models/Person";
import {Departamento} from "./models/Departamento";
import { LessonModalComponent } from './lesson-modal/lesson-modal.component';
import {PersonComponent} from './person/person.component';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  persons: Person[];
  departamentos : Departamento[];
  ciudad: [];

  constructor(private modalService: NgbModal, private afs: AngularFirestore, private fireStore: FirestoreService) {
    this.fireStore.getPersons().subscribe(persons => {
  
      this.persons = persons;
    });

  
  }

  ngOnInit() {
  }

  sortedLessonCards(): Person[] {
    //ascending sorted array by the object week: number. 
    //descending sorted array would be => a.week - b.week this instead of current code.
    return this.persons.sort((a: Person) => a.age);
  }
  open(person: Person) {
    const modalRef = this.modalService.open(LessonModalComponent);
    modalRef.componentInstance.person = person;
  }

  crearRegistro(){
    const modalRef = this.modalService.open(PersonComponent);
  }



}
