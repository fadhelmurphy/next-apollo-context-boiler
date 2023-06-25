
  
import { useQuery, gql } from "@apollo/client";
import { useMemo } from "react";
  export const useGetAllProduct = ({page,perPage}: {page: number, perPage: number}): any => {
    // This is the GraphQL query
    const query = gql`

    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
          lastPage
          currentPage
        }
        media(type: ANIME, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          bannerImage
          type
          genres
          episodes
          averageScore
        }
      }
    }
    `;
  
      let variables: {
        page: Number,
        perPage: Number
      } = {
        page: page,
        perPage: perPage,
      };
      const { data, loading, error, refetch } = useQuery(query,{variables});
      return useMemo(() => ({result: (!loading && !error) && data.Page, loading, refetch}), [data, loading, error, refetch])
    };

    export const useGetDetailProduct = ({id}: {id:number}): any => {
      // This is the GraphQL query
      const query = gql`
      query Query($ID: Int) {
        Media(id: $ID, type: ANIME) {
          id
          title {
            romaji
            english
          }
          bannerImage
          coverImage {
            large
          }
          format
          type
          genres
          episodes
          averageScore
          status
          studios {
            nodes {
              name
            }
          }
        }
      }   
      `;
    
        let variables = {
          ID: id
        };
        const { data, loading, error } = useQuery(query,{variables});
        return {result: (!loading && !error) && data.Media, loading}
      };