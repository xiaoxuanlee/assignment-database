const supertest = require('supertest');
const request = supertest('http://localhost:3000');
const token_user = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyMzQ1NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1NTIxMzAxNCwiZXhwIjoxNjg2NzcwNjE0fQ.w5oNrOnrWjkYJdoHLj68rsAok3cMHgFycH1He2Ors3k";
const token_worker = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndvcmtlcjAyIiwicm9sZSI6IndvcmtlciIsImlhdCI6MTY1NTQwNjA1MCwiZXhwIjoxNjg2OTYzNjUwfQ.ftXHYju8BCaSF4RhasN3SFm2MvNkpTYeqGKiBU138Fo";


describe('Express Route Test', function () {
    
	
	// it('should return hello world', async () => {
	// 	return request.get('/')
	// 		.expect(200)
	// 		.expect('Content-Type', /text/)
	// 		.then(res => {
	// 			expect(res.text).toBe('Hello World');
	// 		});
	// })

	

	it('register admin', async () => {
		return request
		.post('/registeradmin')
		.send({username: 'test23456', password: "test", role: "admin", phone: "123456789", gender:"Male"})
		
		.expect(200).then(response => {
			expect(response.body).toEqual(
				expect.arrayContaining([
					{_id: expect.anything(),
					username: expect.any(String),
					password: expect.any(String),
					role: expect.any(String),
					phonenumber: expect.any(String),
					Gender: expect.any(String)

		}])
			);
		});
			
	});

	it('register user', async () => {
		return request
		.post('/registeruser')
		.send({username: 'test23456', password: "test", Membership_start:"01-01-2022", role: "user", phone: "123456789", gender:"Male"} )
		
		.expect(200).then(response => {
			expect(response.body).toEqual(
				expect.arrayContaining([
					{_id: expect.anything(),
					username: expect.any(String),
					password: expect.any(String),
					role: expect.any(String),
					phonenumber: expect.any(String),
					Gender: expect.any(String),
					Membership_start:expect.any(String)

		}])
			);
		});
			
	});

	it('register worker', async () => {
		return request
		.post('/registerworker')
		.send({username: 'test23456', password: "test", role: "worker", phone: "123456789", gender:"Male"})
		
		.expect(200).then(response => {
			expect(response.body).toEqual(
				expect.arrayContaining([
					{_id: expect.anything(),
					username: expect.any(String),
					password: expect.any(String),
					role: expect.any(String),
					phonenumber: expect.any(String),
					Gender: expect.any(String)

		}])
			);
		});
			
	});

	it('register admin failed', async () => {
		return request
		.post('/registeradmin')
		.send({username: 'test23456', password: "test", role: "admin", phone: "123456789", gender:"Male"  })
		
		.expect(401).then(response => {
			expect(response.text).toEqual(
				expect.any(String)
			);
		});
		
	})

	it('register user failed', async () => {
		return request
		.post('/registeruser')
		.send({username: 'test23456', password: "test", Membership_start:"01-01-2022", role: "user", phone: "123456789", gender:"Male" })
		
		.expect(401).then(response => {
			expect(response.text).toEqual(
				expect.any(String)
			);
		});
		
	})

	it('register worker failed', async () => {
		return request
		.post('/registerworker')
		.send({username: 'test23456', password: "test", role: "worker", phone: "123456789", gender:"Male" })
		
		.expect(401).then(response => {
			expect(response.text).toEqual(
				expect.any(String)
			);
		});
		
	})

	it('user login successfully', async () => {
		return request
			.post('/loginuser')
			.send({username: 'test23456', password: "test" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						{
						_id: expect.anything(),
						username: expect.any(String),
						Membership_start: expect.any(String),
						token: expect.any(String),
						role: expect.any(String),


			}])
				);
			});
            
	});

	it('admin login successfully', async () => {
		return request
			.post('/loginadmin')
			.send({username: 'test23456', password: "test" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						{_id: expect.anything(),
						username: expect.any(String),
						token: expect.any(String),
						role: expect.any(String)

			}])
				);
			});
            
	});

	it('worker login successfully', async () => {
		return request
			.post('/loginworker')
			.send({username: 'test23456', password: "test" })
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						{_id: expect.anything(),
						username: expect.any(String),
						token: expect.any(String),
						role: expect.any(String)

			}])
				);
			});
            
	});

	it('user login failed', async () => {
		return request
			.post('/loginuser')
			.send({username: 'test1', password: "test" })
			
			.expect(401).then(response => {
				expect(response.text).toEqual(
					expect.any(String)
				);
			});
			
	})

	it('admin login failed', async () => {
		return request
			.post('/loginadmin')
			.send({username: 'test1', password: "test" })
			
			.expect(401).then(response => {
				expect(response.text).toEqual(
					expect.any(String)
				);
			});
			
	})

	it('worker login failed', async () => {
		return request
			.post('/loginworker')
			.send({username: 'test1', password: "test" })
			
			.expect(401).then(response => {
				expect(response.text).toEqual(
					expect.any(String)
				);
			});
			
	})

	it("update user", async () => {
		return request
		.patch("/update")
		.set("authorization", token_user)
		.send({username:"test23456",Membership_start:"01-01-2043"})
		.expect(200).then(response => {
			expect(response.text).toEqual(
				expect.any(String)
			);
		});
	}
	)

	it("update user failed", async () => {
		return request
		.patch("/update")
		.set("authorization", token_user)
		.send({username:"test1",Membership_start:"01-01-2022"})
		.expect(401).then(response => {
			expect(response.text).toEqual(
				expect.any(String)
			);
		});
	}
	)

	// it("delete user", async () => {
	// 	return request
	// 	.delete("/deleteuser")
	// 	.set("authorization", token_user)
	// 	.send({username:"test23456"})
	// 	.expect(200).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )

	// it("delete user failed", async () => {
	// 	return request
	// 	.delete("/deleteuser")
	// 	.set("authorization", token_user)
	// 	.send({username:"test1"})
	// 	.expect(401).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )

	// it("delete worker", async () => {
	// 	return request
	// 	.delete("/deleteworker")
	// 	.set("authorization", token_user)
	// 	.send({username:"test23456"})
	// 	.expect(200).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )

	// it("delete worker failed", async () => {
	// 	return request
	// 	.delete("/deleteworker")
	// 	.set("authorization", token_user)
	// 	.send({username:"test1"})
	// 	.expect(401).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )

	// it("delete admin", async () => {
	// 	return request
	// 	.delete("/deleteadmin")
	// 	.set("authorization", token_user)
	// 	.send({username:"test23456"})
	// 	.expect(200).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )

	// it("delete admin failed", async () => {
	// 	return request
	// 	.delete("/deleteadmin")
	// 	.send({username:"test1"})
	// 	.expect(401).then(response => {
	// 		expect(response.text).toEqual(
	// 			expect.any(String)
	// 		);
	// 	});
	// }
	// )


});
