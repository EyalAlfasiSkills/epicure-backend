const axios = require("axios");
const AwsConfig = require("../lib/awsConfig");
require("dotenv").config();

const COGNITO_URL = `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/`;

async function validateCognitoAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { data } = await axios.post(
      COGNITO_URL,
      {
        AccessToken: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser",
        },
      }
    );
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
      error: error,
    });
  }
}

async function refreshToken(req, res, next) {
  const { refreshToken } = req.body;
  const refreshTokenResponse = await axios.post(
    COGNITO_URL,
    {
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    },
    {
      headers: {
        "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        "Content-Type": "application/x-amz-json-1.1",
      },
    }
  );
  const accessToken =
    refreshTokenResponse.data.AuthenticationResult.AccessToken;
  if (accessToken) {
    return res.status(200).json({ accessToken });
  }
  return res.status(401).json({
    message: "Auth failed",
    error: error,
  });
}

module.exports = { validateCognitoAccessToken, refreshToken };
