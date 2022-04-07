import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
user:any
lDate:any
dacno:any
  depositForm = this.fb.group({

    //form array create

    acno: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    pass: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

 
  withdrawForm = this.fb.group({

    //form array create

    acno1: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    pass1: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    withdrawamount: ['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private ds:DataService,private fb:FormBuilder ,private router:Router) {
    this.user=this.ds.currentUname


this.lDate =new Date()


   }


  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login!!!!")
      this.router.navigateByUrl("")
    }

  }

//deposit
deposit()
{
 var acno=this.depositForm.value.acno
var pass=this.depositForm.value.pass
 var amount=this.depositForm.value.amount
 if(this.depositForm.valid)
 //calling deposit function of dataservice -asynchronous
this.ds.deposit(acno,pass,amount)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
  }
},
(result)=>{
  alert(result.error.message)
}
)

else{
  alert("invalid form")
}
  

}


//withdrawal

withdraw()
{
 var acno=this.withdrawForm.value.acno1
var pass=this.withdrawForm.value.pass1
 var amount=this.withdrawForm.value.withdrawamount
 
 if(this.withdrawForm.valid){
   //calling withdraw function of dataservice- asynchrono
  this.ds.withdraw(acno,pass,amount)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
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




logout(){
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("currentUname")
  this.router.navigateByUrl("")
}


deleteAccount(){
  this.dacno=JSON.parse(localStorage.getItem("currentAcno")||'')
  console.log(this.dacno);
  
}

cancel(){
  this.dacno=""
}
delete(event:any){
  
  // alert("delete account"+event+"from parent")
  //asynchronous
  this.ds.delete(event)
  .subscribe((result:any)=>{
    if(result){
      alert(result.message)
      localStorage.removeItem("currentAcno")
      localStorage.removeItem("currentUname")
      localStorage.removeItem("token")
      this.router.navigateByUrl("")

    }
  },
  (result)=>{
    alert(result.error.message)
  }
  )
  
}

}

