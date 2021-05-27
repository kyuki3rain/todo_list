import { CognitoUser } from 'amazon-cognito-identity-js';

export type UserState = {
  user: CognitoUser,
  loggedIn: boolean
}

export type UserAction = {
  type: String,
  value?: {
    user?: CognitoUser
  }
}

export function reducer(state: UserState, action: UserAction) {
    switch (action.type) {
      case "login": {
        return { user: action!.value!.user, loggedIn: true };
      }
      case "logout": {
        return { user: null, loggedIn: false }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  