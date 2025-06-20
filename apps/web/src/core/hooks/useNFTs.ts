import { useQuery } from "@tanstack/react-query"
import request from 'graphql-request'

export const useNFTs = () => {
  const { data } = useQuery({
    queryKey: ['nft'],
    queryFn: () => request('http://localhost:42069', `
      query Mint {
        mints(where: { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" }) {
          items {
            owner
            tokenId
          }
        }
      }
    `)
  })

  console.log({data})

  return {
    data
  }
}