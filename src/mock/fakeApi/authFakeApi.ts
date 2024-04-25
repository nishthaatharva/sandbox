import { Server, Response } from 'miragejs'
import uniqueId from 'lodash/uniqueId'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'; // Import Axios for making HTTP requests

export default function authFakeApi(server: Server, apiPrefix: string) {
    const signInUrl = 'https://localhost:7227/api/auth/signin';

    server.post(`${apiPrefix}/sign-in`, async (schema, request) => {
        try {
            // Parse the request body to extract username and password
            const { userName, password } = JSON.parse(request.requestBody)
            
            // Make HTTP request to the sign-in URL using Axios
            const response = await axios.post(signInUrl, { userName, password });

            // Check if response status is 200 (success)
            if (response.status === 200) {
                // Return user data and token from the response
                return response.data;
            } else {
                // If response status is not 200, return 401 (unauthorized)
                return new Response(
                    401,
                    { some: 'header' },
                    { message: 'Invalid email or password!' }
                );
            }
        } catch (error) {
            // If an error occurs during the request, return 500 (internal server error)
            return new Response(
                500,
                { some: 'header' },
                { message: 'Internal Server Error' }
            );
        }
    });

    server.post(`${apiPrefix}/sign-out`, () => {
        return true;
    });

    server.post(`${apiPrefix}/sign-up`, (schema, { requestBody }) => {
        const { userName, password, email } = JSON.parse(requestBody)
        const userExist = schema.db.signInUserData.findBy({
            accountUserName: userName,
        })
        const emailUsed = schema.db.signInUserData.findBy({ email })
        const newUser = {
            avatar: '/img/avatars/thumb-1.jpg',
            userName,
            email,
            authority: ['admin', 'user'],
        }
        if (!isEmpty(userExist)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'User already exist!' }
            )
        }

        if (!isEmpty(emailUsed)) {
            const errors = [
                { message: '', domain: 'global', reason: 'invalid' },
            ]
            return new Response(
                400,
                { some: 'header' },
                { errors, message: 'Email already used' }
            )
        }

        schema.db.signInUserData.insert({
            ...newUser,
            ...{ id: uniqueId('user_'), password, accountUserName: userName },
        })
        return {
            user: newUser,
            token: 'wVYrxaeNa9OxdnULvde1Au5m5w63',
        }
    });

    server.post(`${apiPrefix}/forgot-password`, () => {
        return true
    });

    server.post(`${apiPrefix}/reset-password`, () => {
        return true
    });
}
