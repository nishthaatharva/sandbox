import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { jwtDecode } from 'jwt-decode'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const decodeToken = (token: any) => {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };

    const decodedToken = decodeToken(token);

   

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                dispatch(signInSuccess(resp.data.data.token))
                // if (resp.data.user) {
                //     dispatch(
                //         setUser(
                //             resp.data.user || {
                //                 avatar: '',
                //                 userName: 'Anonymous',
                //                 authority: ['USER'],
                //                 email: '',
                //             }
                //         )
                //     )
                // }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.Messages[0] || errors?.response?.data?.Message,
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const addUser = async (userData: any) => {
        try {
            // Add logic to call API to add user
            // For example:
            // const response = await apiAddUser(userData);
            // if (response.data.success) {
            //     return { status: 'success', message: 'User added successfully' };
            // } else {
            //     return { status: 'failed', message: response.data.message };
            // }

            // For now, let's assume the user is always added successfully
            return { status: 'success', message: 'User added successfully' }
        } catch (error) {
            return { status: 'failed', message: 'Failed to add user' }
        }
    }
    const handleSignOut = () => {
        dispatch(signOutSuccess())
        // dispatch(
        //     setUser({
        //         avatar: '',
        //         userName: '',
        //         email: '',
        //         authority: [],
        //     })
        // )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        //await apiSignOut()
        handleSignOut()
        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
    }

    return {
        authenticated: token && signedIn,
        jwtToken: token,
        decodedToken: decodedToken,
        signIn,
        signUp,
        signOut,
        addUser,
    }
}

export default useAuth
