"use server"


export async function generateStaticParams (makeId:number,year:string) {
    

    const result = await fetch(`<https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json>`).then((res)=>
    
res.json()
    )
return result
    

}
