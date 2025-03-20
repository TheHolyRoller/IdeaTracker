import { Client, Databases, Account } from "appwrite"; 

const client = new Client(); 
console.log('this is the client', client); 

client.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("67d9e1fa00246f29e7c2"); 


export const account = new Account(client); 

console.log('this is the account', account); 

export const databases = new Databases(client); 
console.log('this is the database', databases); 