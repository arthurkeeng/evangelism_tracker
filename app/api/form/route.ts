
import {NextRequest , NextResponse} from 'next/server'

export async function POST(req : NextRequest){
    const url = 'https://script.google.com/macros/s/AKfycby7ATanhOVGjtzyIlkDpr4rqskqFN6UzQFJFtaVC1SK1HcZje2TnQt7qH-33JDeBCkndA/exec'
    
    const data = await req.json()

    const formBody = new URLSearchParams({
        Name: data.name,
        Address: data.address || "123 johndoe street",
        Phone: data.phone,
        Email: data.email || "johndoe@gmail.com",
        Comments : data.convert == "yes" ? "Person is a convert" : data.convert == "no" ? "Person is not a convert" : ""
      }).toString();
try {

    // const formBody = new URLSearchParams(body).toString();
    
    await fetch(url , {
        method : 'POST' , 
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
             body : formBody
    })
    return NextResponse.json({message : "success"})
} catch (error) {
    console.log('the error is ' , error)
    return NextResponse.json({message : "failed"})
    
}


}
