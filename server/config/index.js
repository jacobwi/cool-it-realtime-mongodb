let MongoUsername = "admin";
let MongoPassword = "abc1234";
const MongoURI = `mongodb://${MongoUsername}:${MongoPassword}@ds115963.mlab.com:15963/auth-system`;

const jwtKey = "tyt1tyt1";
export { MongoURI, jwtKey };
