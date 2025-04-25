export namespace models {
	
	export class User {
	    Id: number;
	    Username: string;
	    Password: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Username = source["Username"];
	        this.Password = source["Password"];
	    }
	}
	export class Type {
	    Id: number;
	    Name: string;
	    UserId: number;
	    User: User;
	
	    static createFrom(source: any = {}) {
	        return new Type(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.UserId = source["UserId"];
	        this.User = this.convertValues(source["User"], User);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Stock {
	    Id: number;
	    Name: string;
	    ImeI: string;
	    TypeId: number;
	    Type: Type;
	    Quantity: number;
	    UserID: number;
	    User: User;
	
	    static createFrom(source: any = {}) {
	        return new Stock(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.ImeI = source["ImeI"];
	        this.TypeId = source["TypeId"];
	        this.Type = this.convertValues(source["Type"], Type);
	        this.Quantity = source["Quantity"];
	        this.UserID = source["UserID"];
	        this.User = this.convertValues(source["User"], User);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Buy {
	    StockID: number;
	    Stock: Stock;
	    Price: number;
	    // Go type: time
	    Date: any;
	    Quantity: number;
	
	    static createFrom(source: any = {}) {
	        return new Buy(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.StockID = source["StockID"];
	        this.Stock = this.convertValues(source["Stock"], Stock);
	        this.Price = source["Price"];
	        this.Date = this.convertValues(source["Date"], null);
	        this.Quantity = source["Quantity"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Sell {
	    StockID: number;
	    Stock: Stock;
	    Price: number;
	    // Go type: time
	    Date: any;
	    Quantity: number;
	
	    static createFrom(source: any = {}) {
	        return new Sell(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.StockID = source["StockID"];
	        this.Stock = this.convertValues(source["Stock"], Stock);
	        this.Price = source["Price"];
	        this.Date = this.convertValues(source["Date"], null);
	        this.Quantity = source["Quantity"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	

}

