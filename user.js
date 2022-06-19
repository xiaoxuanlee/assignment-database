const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");

let users,admins,workers,dates;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
class User {
	static async injectDB(conn) {
		users = await conn.db("my-database-name").collection("users");
		admins = await conn.db("my-database-name").collection("admins");
		workers = await conn.db("my-database-name").collection("workers");
		dates = await conn.db("my-database-name").collection("analytics");
	}
    
	static async registeruser(username,password,date,phone,gender) {
        
		//Check if username exists
        const count = await users.find({"username": username}).count();
        if(count != 0) {
            console.log("Username already exists");
			console.log(username);
            return "false";
        }
		else{    
		//Hash password
			
            const hashpassword = await bcrypt.hash(password, 10);
			// let q;
			// q = push(username,hashpassword,date,role,phone,gender);
            await users.insertOne({"username": username, "Membership_start": date,"role": "user","phonenumber": phone,"Gender":gender,"password": hashpassword,});
            console.log("new user is created");
			console.log(hashpassword);
			console.log(date);
			
            return (await users.find({"username": username}).toArray());
		// Register user to database
        
	}

}
static async registeradmin(username,password,phone,gender) {
        
	//Check if username exists
	const count = await admins.find({"username": username}).count();
	if(count != 0) {
		console.log("Username already exists");
		console.log(username);
		return "false";
	}
	else{    
	//Hash password
		
		const hashpassword = await bcrypt.hash(password, 10);
		// let q;
		// q = push(username,hashpassword,date,role,phone,gender);
		await admins.insertOne({"username": username, "role": "admin","phonenumber": phone,"Gender":gender,"password": hashpassword,});
		console.log("new user is created");
		console.log(hashpassword);
		
		
		return (await admins.find({"username": username}).toArray());
	//Save admin to database
	
}


}

static async registerworker(username,password,phone,gender) {
        
	//Check if username exists
	const count = await workers.find({"username": username}).count();
	
	if(count != 0) {
		console.log("Username already exists");
		console.log(username);
		return "false";
	}
	else{    
	//Hash password
		
		const hashpassword = await bcrypt.hash(password, 10);
		// let q;
		// q = push(username,hashpassword,date,role,phone,gender);
		await workers.insertOne({"username": username,"role": "worker","phonenumber": phone,"Gender":gender,"password": hashpassword,});
		console.log("new user is created");
		console.log(hashpassword);
		
		
		return (await workers.find({"username": username}).toArray());
	// Save worker to database
	
}

}

	static async loginuser(username, password) {
		// Check if username exists
		if(await users.find({"username": username}).count() == 1) {	
		// Validate user's password
			var result = await users.find({"username": username}).toArray();
			var Obj = result.map(a => a.password);
			if(bcrypt.compareSync(password,Obj.toString()) == true) {
				console.log("Login Successful");
				console.log(await users.find({"username": username}).toArray());
				const d = new Date();
				let record = days[d.getDay()];
				console.log(record);
				await dates.insertOne({"username": username, "day": record});
				return (users.find({"username": username}).toArray());
			}
			else{
				console.log("password entered is incorrect");
				
				return "false";
			}
		}
		else{
			console.log("User does not exist");
			return "false";
		}
		//Return user object
		return;
	}

	static async loginadmin(username, password) {
		// TODO: Check if username exists
		if(await admins.find({"username": username}).count() == 1) {	
		// TODO: Validate password
			var result = await admins.find({"username": username}).toArray();
			var Obj = result.map(a => a.password);
			if(bcrypt.compareSync(password,Obj.toString()) == true) {
				console.log("Login Successful");
				console.log(await admins.find({"username": username}).toArray());
				
				return (admins.find({"username": username}).toArray());
			}
			else{
				console.log("password entered is incorrect");
				
				return "false";
			}
		}
		else{
			console.log("User does not exist");
			return "false";
		}
		
		return;
	}

	static async loginworker(username, password) {
		// Check if worker's username exists
		if(await workers.find({"username": username}).count() == 1) {	
		//Validate worker's password
			var result = await workers.find({"username": username}).toArray();
			var Obj = result.map(a => a.password);
			if(bcrypt.compareSync(password,Obj.toString()) == true) {
				console.log("Login Successful");
				console.log(await workers.find({"username": username}).toArray());
				return (workers.find({"username": username}).toArray());
			}
			else{
				console.log("password entered is incorrect");
				
				return "false";
			}
		}
		else{
			console.log("User does not exist");
			return "false";
		}
		// Return user object
		return;
	}

	static async update(username, date) {

		if (await users.find({"username": username}).count()) {
			var result = await users.update({"username": username}, {$set: {"Membership_start": date}});
			return ("Membership_start updated");
		}
		else{
			console.log("User does not exist")
			return "User does not exist";
		}
}
	static async deleteuser(username) {
		if (await users.find({"username": username}).count()) {
			var result = await users.deleteOne({"username": username});
			return ("User deleted");
		}
		else{
			console.log("User does not exist")
			return "User does not exist";
		}
	}
	static async deleteadmin(username) {
		if (await admins.find({"username": username}).count()) {
			var result = await admins.deleteOne({"username": username});
			return ("Admin deleted");
		}
		else{
			console.log("Admin does not exist")
			return "Admin does not exist";
		}
	}
	static async deleteworker(username) {
		if (await workers.find({"username": username}).count()) {
			var result = await workers.deleteOne({"username": username});
			return ("Worker deleted");
		}
		else{
			console.log("Worker does not exist")
			return "Worker does not exist";
		}
	}

	static async getUser(username) {
		if (await users.find({"username": username}).count() == 1) {
			var result = await users.find({"username": username}).toArray();
			return result;
		}
		else{
			console.log("User does not exist")
			return "User does not exist";
		}
	}

	static async analysis(day) {
		if(day == days[0] || day == days[1] || day == days[2] || day == days[3] || day == days[4] || day == days[5] || day == days[6]){
		var result = await dates.find({"day": day}).count();
		console.log(result);
		return result;

	}
	else{
		console.log("Day does not exist")
		return "Day does not exist";
	}

	}
}

	

module.exports = User;
