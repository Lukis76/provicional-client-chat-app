import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

//////////////////////////////////////////////////
const OPERATION_REFRESH = gql`
  query Refresh {
    refresh {
      timeOut
    }
  }
`
//////////////////////////////////////////////////////////////////////
export const useAuthorization = (initial = undefined) => {
  const [check, setCheck] = useState<boolean | undefined>(initial)

  const { data } = useQuery(OPERATION_REFRESH, {
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    setCheck(data?.refresh?.timeOut)
  }, [data])

  return {
    check,
  }
}
