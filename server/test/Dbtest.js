const {expect}= require("chai")
const {query} = require("../config/db")
require("dotenv").config()

describe("Db connection",function(){
    it("should establish a connection ", async () => {
let connection = null ;
console.log('expect',expect);


try {
    connection = await query();
    expect(connection).to.not.be.null
    // Check the connection status
    const res = await client.query("SELECT 1 + 1 AS result"); // Run a simple query
    expect(res.rows[0].result).to.equal(2); // Ensure the query result is as expected

} catch (error) {
    expect.fail("db connect fail " + error.message)
}finally {
    if(connection){
        await connection.end();
    }
}
    }
    )
})