import {USERS} from "../variables.ts";
import {initRequest} from "../index.ts";
import {I_UserSchema} from "../types";

export const authenticateUser = async () =>
	fetch(
		USERS.auth_user.url,
		initRequest({
			method: USERS.auth_user.method,
			auth: true
		})
	).then(async (response): Promise<I_UserSchema | void> => {
		if (!response || !response.ok) {
			return console.error(
				`Failed to accept friend request Status: ${response?.status}`,
				response
			);
		}
		return response.json();
	});