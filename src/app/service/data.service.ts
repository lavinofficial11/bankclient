import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LoginComponent } from '../login/login.component';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentAcno: any

  currentUname: any

 

  database: any = {
    1000: { acno: 1000, uname: "neer", password: 123, balance: 5000, transactions: [] },
    1001: { acno: 1001, uname: "vyom", password: 1001, balance: 5000, transactions: [] },
    1002: { acno: 1002, uname: "laisha", password: 1002, balance: 5000, transactions: [] }
  }


  constructor(private http:HttpClient) {  
    // this.getData()
  }


  //to store data in localstorage

  storeData() {
    localStorage.setItem("database", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUname) {
      localStorage.setItem("currentUname", JSON.stringify(this.currentUname))
    }
  }


  //to get data from localstorage

    getData(){
      if(localStorage.getItem("database")){
        this.database=JSON.parse(localStorage.getItem("database") ||``)
      }
      if(localStorage.getItem("currentAcno")){
        this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") ||``)
      }
      if(localStorage.getItem("currentUname")){
        this.currentUname=JSON.parse(localStorage.getItem("currentUname") ||``)
      }
    }
//register
  register(acno: any, password: any, uname: any) {

    const data ={
      acno,
    password,
    uname
    }

   return this.http.post('http://localhost:3000/register',data)

    // let database = this.database
    // if (acno in database) {
    //   return false
    // }
    // else {
    //   database[acno] = {
    //     acno,
    //     uname,
    //     password,
    //     balance: 0,
    //     transactions: []


    //   }
    //   console.log(database);
    //   this.storeData()
    //   return true
    // }
  }

  //login
  login(acno: any, password: any) {

    const data ={
      acno,
    password
    }

   return this.http.post('http://localhost:3000/login',data)   


    // let database = this.database
    // if (acno in database) {
    //   if (password == database[acno]["password"]) {
    //     this.currentAcno = acno;
    //     this.currentUname = database[acno]["uname"]
    //     this.storeData()
    //     return true
    //   }
    //   else {
    //     alert("incorrect pswd")
    //     return false
    //   }
    // }
    // else {
    //   alert("user doesnot exist")
    //   return false
    // }
  }


  // deposit

  deposit(acno: any, password: any, amt: any) {
  //req body 
  const data={
    acno,
    password,
    amt
  }




  //deposit API
  return this.http.post('http://localhost:3000/deposit',data,this.getOptions())   


  //   var amount = parseInt(amt)
  //   let database = this.database

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       database[acno]["balance"] = database[acno]["balance"] + amount
  //       database[acno]["transactions"].push({
  //         amount: amount,
  //         type: "CREDIT"
  //       })
  //       // console.log(database);
  //       this.storeData()


  //       return database[acno]["balance"]
  //     }
  //     else {
  //       alert("password incorrect")
  //       return false
  //     }

  //   }
  //   else {
  //     alert("user doesnot exist!!!!!!")
  //     return false
  //   }
   }
   //to add token in request header
   getOptions(){
     //token fetch from localstorage
const token=JSON.parse(localStorage.getItem('token')||'')
// to create request headers
let headers=new HttpHeaders()
if(token){
headers=headers.append('x-acess-token',token)
options.headers=headers
}
return options
   }


  //withdeaw

  withdraw(acno: any, password: any, amt: any) {
    //req body 
  const data={
    acno,
    password,
    amt
  }




  //withdraw API
  return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())   



    // var amount = parseInt(amt)
    // let database = this.database

    // if (acno in database) {
    //   if (password == database[acno]["password"]) {
    //     if (database[acno]["balance"] > amount) {
    //       database[acno]["balance"] -= amount
    //       database[acno]["transactions"].push({
    //         amount: amount,
    //         type: "DEBIT"
    //       })
    //       this.storeData()

    //       // console.log(database);
    //       return database[acno]["balance"]
    //     }
    //     else {
    //       alert("insuffitient balance!!!!")
    //       return false
    //     }
    //   }

    //   else {
    //     alert("password incorrect")
    //     return false
    //   }

    // }
    // else {
    //   alert("user doesnot exist!!!!!!")
    //   return false
    // }
  }

  //transactioin

  getTransaction(acno: any) {
     //req body 
  const data={
    acno
  }
 //transaction API
  return this.http.post('http://localhost:3000/transaction',data,this.getOptions())   

  }

//delete acc

delete(acno:any){
  //delete api
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
}

}

