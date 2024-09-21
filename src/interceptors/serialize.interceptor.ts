import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto : any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       //run something before a request is handled  by the request handler 
       console.log("I am running before the handler",context)
        return next.handle().pipe(
            map((data : any)=>{
                //run somthing before the response is sent out 
                console.log('I am running before the response is sent out ',data)
                return plainToClass( this.dto,data,{
                    excludeExtraneousValues :true ,  // to make sure everything work as expected 
                })
            } )
        )
    }
}


export function Serialize (dto :any ){
    return UseInterceptors(new SerializerInterceptor(dto))
}