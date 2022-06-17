const MongoClient = require("mongodb").MongoClient;
const User = require("./user")

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.3owbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.registeruser("test75", "test","01-01-2021","user","12345","Male");
		expect(res).toEqual(
				expect.arrayContaining([
					{   _id: res[0]._id,
                        username: expect.any(String),
                        password: expect.any(String),
                        Gender:expect.any(String),
                        role:expect.any(String),
                        phonenumber:expect.any(String),
                        Membership_start:expect.any(String)

		}])
		)
	})

	test("New admin registration", async () => {
		const res = await User.registeradmin("test75", "test","admin","12345","Male");
		expect(res).toEqual(
				expect.arrayContaining([
					{   _id: res[0]._id,
                        username: expect.any(String),
                        password: expect.any(String),
                        Gender:expect.any(String),
                        role:expect.any(String),
                        phonenumber:expect.any(String)
					

		}])
		)
	})

	test("New worker registration", async () => {
		const res = await User.registerworker("test75", "test","worker","12345","Male")
		expect(res).toEqual(
				expect.arrayContaining([
					{   _id: res[0]._id,
                        username: expect.any(String),
                        password: expect.any(String),
                        Gender:expect.any(String),
                        role:expect.any(String),
                        phonenumber:expect.any(String)
					

		}])
		)
	})

	test("Duplicate user username", async () => {
		const res = await User.registeruser("test75", "test")
		expect(res).toBe("false")
	})

	test("Duplicate admin username", async () => {
		const res = await User.registeradmin("test75", "test")
		expect(res).toBe("false")
	})

	test("Duplicate worker username", async () => {
		const res = await User.registerworker("test75", "test")
		expect(res).toBe("false")
	})

	test("User login invalid username", async () => {
		const res = await User.loginuser("test123", "test")
		expect(res).toBe("false")
	})

	test("User login invalid password", async () => {
		const res = await User.loginuser("test75", "test1")
		 expect(res).toBe("false")
		


	})

	test("Admin login invalid username", async () => {
		const res = await User.loginadmin("test123", "test")
		expect(res).toBe("false")
	})

	test("Admin login invalid password", async () => {
		const res = await User.loginadmin("test75", "test1")
		 expect(res).toBe("false")
		


	})

	test("Worker login invalid username", async () => {
		const res = await User.loginworker("test123", "test")
		expect(res).toBe("false")
	})

	test("Worker login invalid password", async () => {
		const res = await User.loginworker("test75", "test1")
		 expect(res).toBe("false")
		


	})

	test("User login successfully", async () => {
		const res = await User.loginuser("test75", "test")
		console.log(res)
		expect(res).toEqual(
				expect.arrayContaining([
					{
                        _id: res[0]._id,
					username: expect.any(String),
					password: expect.any(String),
					Gender:expect.any(String),
					role:expect.any(String),
					phonenumber:expect.any(String),
					Membership_start:expect.any(String)

		}])
		);
		});

		test("Admin login successfully", async () => {
			const res = await User.loginadmin("test75", "test")
			console.log(res)
			expect(res).toEqual(
					expect.arrayContaining([
						{_id: res[0]._id,
                            username: expect.any(String),
                            password: expect.any(String),
                            Gender:expect.any(String),
                            role:expect.any(String),
                            phonenumber:expect.any(String)
	
			}])
			);
			});

			test("Worker login successfully", async () => {
				const res = await User.loginworker("test75", "test")
				console.log(res)
				expect(res).toEqual(
						expect.arrayContaining([
							{
                                _id: res[0]._id,
                        username: expect.any(String),
                        password: expect.any(String),
                        Gender:expect.any(String),
                        role:expect.any(String),
                        phonenumber:expect.any(String),
		
				}])
				);
				});
		
		test("Update user details successful", async () => {

			const res = await User.update("test75","01-01-2888")
			expect(res).toBe("Membership_start updated")
		});

		test("Update user details unsuccessful", async () => {

			const res = await User.update("test3543","01-01-2888")
			expect(res).toBe("User does not exist")
		});

		test("Delete user", async () => {
			
			const res = await User.deleteuser("test75")
			expect(res).toBe("User deleted")
		});


		test("Delete user unsuccessful", async () => {
			
			const res = await User.deleteuser("test2455")
			expect(res).toBe("User does not exist")
		});

		test("Delete admin", async () => {
			
			const res = await User.deleteadmin("test75")
			expect(res).toBe("Admin deleted")
		});

		test("Delete admin unsuccessful", async () => {
			
			const res = await User.deleteadmin("test123")
			expect(res).toBe("Admin does not exist")
		});

		test("Delete worker", async () => {
			
			const res = await User.deleteworker("test75")
			expect(res).toBe("Worker deleted")
		});

		test("Delete worker unsuccessful", async () => {
			
			const res = await User.deleteworker("test123")
			expect(res).toBe("Worker does not exist")
		});

		

		

		
	
});