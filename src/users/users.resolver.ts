/* eslint-disable prettier/prettier */
import {  UseGuards } from '@nestjs/common';
import { Query,Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import console from 'console';
import { Types } from 'mongoose';
import { GqlAuthGuard } from './uers.guard';
import { CreateUserInput, UpdateUserInput } from './users-input.dto';
import { CurrentUser } from './users.docrator';
import { User } from './users.entity';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(()=>User)
  async createUser(@Args('createUserInput') createUserInput:CreateUserInput){
    try{  
      return await this.userService.createUser(createUserInput)
    }catch(err){
      console.log(err);
    }
  }

   @Mutation(()=>String)
   async login (
      @Args('email') email:string,
      @Args('password') password:string,
   ){
     try{
       return await this.userService
       .login({email,password});
     }catch(err){console.log(err)}
   }

   @Query(()=>[User])
   @UseGuards(GqlAuthGuard)
   async findAllUsers(){
     try{
       return await this.userService.findAll()
     }catch(err){console.log(err)}
   }

    @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async UpdateUserPass(
    @CurrentUser() user: User,
    @Args('currPass') currPass: string,
    @Args('newPass') newPass: string,
  ) {
    try {
      return await this.userService.updatePassword(user._id, currPass, newPass);
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return await this.userService.findOne(_id);
  }
@Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async UpdateUserInput(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.userService.updateUser(user._id, updateUserInput);
    } catch (err) {
      console.error(err);
    }
  }
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async removeUser(@Args('_id') _id: string) {
    try {
      return await this.userService.remove(_id);
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async CurrentUser(@CurrentUser() user: User) {
    try {
      return await this.userService.findOne(user._id);
    } catch (err) {
      console.error(err);
    }
  }

}

