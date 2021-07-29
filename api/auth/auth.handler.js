const bcrypt = require("bcrypt");
const UserModel = require("../../models/UserModel");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AwsConfig = require("../../lib/awsConfig");


function login({ email, password }) {
  return new Promise((resolve) => {
    const cognitoUser = AwsConfig.getCognitoUser(email);
    cognitoUser.authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        };
        return resolve({
          statusCode: 200,
          response: AwsConfig.decodeJWTToken(token),
        });
      },
      
      onFailure: (err) => {
        return resolve({
          statusCode: 400,
          response: err.message || JSON.stringify(err),
        });
      },
      
      // newPasswordRequired: function (userAttributes) {
        //   console.log({ userAttributes });
        //   delete userAttributes.email_verified;
        //   delete userAttributes.phone_number_verified;
        //   delete userAttributes.phone_number;
        //   cognitoUser.completeNewPasswordChallenge(
          //     "12345678",
          //     userAttributes,
          //     this
          //   );
          // },
        });
      });
    }
    
    
    // async function login(incomingUser) {
    //   const savedUser = (await UserModel.findOne({ email: incomingUser.email })).toObject();
    //   if (!savedUser) return null;
    //   const passwordMatch = await _comparePasswords(
    //     incomingUser.password,
    //     savedUser.password
    //   );
    //   if (!passwordMatch) return null;
    //   delete savedUser.password;
    //   return savedUser;
    // }
    
    async function _comparePasswords(incomingPassword, savedUser) {
      const passwordMatch = await bcrypt.compare(incomingPassword, savedUser);
      return passwordMatch;
    }
    
async function _hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

module.exports = {
  login,
};
