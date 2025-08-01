// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {models} from '../models';

export function AddStock(arg1:string,arg2:string,arg3:number,arg4:number,arg5:number,arg6:number):Promise<string>;

export function AddType(arg1:string):Promise<void>;

export function DeleteCategory(arg1:number):Promise<void>;

export function DeleteStock(arg1:number):Promise<void>;

export function GetCurrentUser():Promise<string>;

export function GetRecentBuy(arg1:number):Promise<Array<models.Buy>>;

export function GetRecentSell(arg1:number):Promise<Array<models.Sell>>;

export function GetStock():Promise<Array<models.Stock>>;

export function GetType():Promise<Array<models.Type>>;

export function IsLoggedIn():Promise<boolean>;

export function Login(arg1:string,arg2:string):Promise<string>;

export function Register(arg1:string,arg2:string):Promise<string>;

export function ResizeWindow(arg1:number,arg2:number):Promise<void>;
