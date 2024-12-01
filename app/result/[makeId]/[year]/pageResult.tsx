"use client";

import { Suspense } from "react";
import { generateStaticParams } from "./result";
import { Loading } from "@/app/common/loading";





 export async  function ResultPage ({params}:{params:{makeId:number,year:string}}) {
    const {makeId,year} = params
    const resCar = await generateStaticParams(makeId,year)

    return(
        <div>
            <Suspense  fallback={<Loading/>}>
            {resCar}
            </Suspense>

       </div>

    )
    

}




     
   

