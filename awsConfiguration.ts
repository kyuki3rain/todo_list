import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-northeast-1:b14407eb-dfa7-4c7a-94ce-211915827791',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-northeast-1',
    }
});

// You can get the current config object
export const currentConfig = Auth.configure();
export default Auth;