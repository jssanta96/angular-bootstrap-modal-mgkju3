
import { Person } from '../models/person';
import { Departamento } from '../models/Departamento';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from "../service/firestore.service";

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  departamentos: Departamento[];
  ciudad:[]

  constructor(public activeModal: NgbActiveModal, private afs: AngularFirestore, private fireStore: FirestoreService) { 
     this.fireStore.getDepartamentos().subscribe(departamentos => {
      
      this.departamentos= departamentos

    
      
    });
  }
   

 onClickSubmit(data) {
   let msg = []
   document.getElementById("msg").innerHTML = ""
      
      if(data.fecha<"2000-01-01" || data.fecha=="" ){
        msg.push("la fecha no puede ser menor a 2000-01-01");
      }

      if(data.texto.length<4 || data.texto=="" ){
        msg.push("El texto no puede ser menor a 4 caracteres");
      }
      if(data.numero<0 || data.numero=="" ){
        msg.push("El numero no puede ser menor a cero");
      }
      if(msg){
        let message= "";
        for(let i=0; i< msg.length ; i ++) {
          message += msg[i] + " <br> "
         
        }
        
         document.getElementById("error").innerHTML = message
      }
      if(msg.length==0){
         document.getElementById("msg").innerHTML = "<h2>Datos Validos</h2>";
      }
      
   }

   onChange(value) {
    
    for(let i=0;i<this.departamentos.length;i++){
      if(this.departamentos[i].nombre == value){
        this.ciudad = this.departamentos[i].ciudad;
      }
    }
}
}