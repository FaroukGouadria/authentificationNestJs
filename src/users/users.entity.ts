/* eslint-disable prettier/prettier */
import {Field, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";


enum Roles {
    Admin = 'Admin',
    Basic = 'Basic',
}

registerEnumType(Roles,{
    name:'Roles',
    description:'Roles for admin creating project and users',

})

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(()=>String)
  @Prop()
  firstName:string;

   @Field(()=>String)
  @Prop()
  lastName:string;
  
   @Field(()=>String)
  @Prop()
  password:string;
  
   @Field(()=>String)
  @Prop()
  email:string;

  @Field(()=>String)
  @Prop()
  createdAt:string;

    @Field(()=>Roles,{defaultValue:Roles.Admin,nullable:true})
    @Prop()
    roles?:string;

}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
