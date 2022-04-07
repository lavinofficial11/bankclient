import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname = ""
  acno = ""
  pass = ""
  //register group model creation
  registerForm = this.fb.group({

    //form array create

    acno: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    psd: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    uname: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })

    constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.get('uname'));
    
    var acno = this.registerForm.value.acno
    var uname = this.registerForm.value.uname
    var pswd = this.registerForm.value.psd

    if(this.registerForm.valid){
     //asynchronous 
       this.ds.register(acno, pswd,uname)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
    this.router.navigateByUrl("")
  }
},
(result)=>{
  alert(result.error.message)
  
}
)
     
    }
    else{
      alert("invalid form")
    }
    
  }
}
