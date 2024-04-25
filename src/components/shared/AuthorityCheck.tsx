import useAuthority from '@/utils/hooks/useAuthority'
import type { CommonProps } from '@/@types/common'
import useAuth from '@/utils/hooks/useAuth'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    debugger
    const { userAuthority = [], authority = [], children } = props
    const { decodedToken } = useAuth();

    const roleMatched = useAuthority(decodedToken?.roles, authority)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
