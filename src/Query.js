
//we added (pageCount, queryString) to convert it into a function that accepts some values. 
// Then we're going to have to pass along some data, so pageCount
const githubQuery = (
  pageCount, 
  queryString, 
  paginationKeyword, 
  paginationString
  ) => {
      //I just want to see the viewer's name
      //We added the search here, and also we added a little bit of sorting algorithm here
      //licenseInfo: to track if it has the proper license
  return {
  query : `
      {
      viewer {
        name
      }
      search(query: "${queryString}user:LAGCC sort:last-updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
        repositoryCount
        edges {
          cursor
          node {
              ...on Repository {
                  name description id url viewerSubscription licenseInfo {
                      spdxId
              }
            }
          } 
        }
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        } 
      } 
  }
      `, 
  }
 
};

export default githubQuery;

