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
	export class Stock {
	    Id: number;
	    Name: string;
	    ImeI: string;
	    Type: string;
	    Barcode: string;
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
	        this.Type = source["Type"];
	        this.Barcode = source["Barcode"];
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

}

