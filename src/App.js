// 1) Let's import the github object that
// I created from my database file
// that has all the credentials that I will need to
// import my application

import github from "./db.js";
import query from "./Query";
import RepoInfo from "./RepoInfo.js";
import SearchBox from "./SearchBox.js";
import NavButtons from "./NavButtons.js";


// 2) useEffect This is going to allow us to load up that data when
// we need it in our application
// 3) Import useEffect is what we call a react hook
// Allows us to perform what they call it side effects and
// function components.
// Another hook is useState

// useCallback to optimize how and when items are rendered in our
// application, it's going to remember our data and not update it
// unless we need it to
import {useEffect, useState, useCallback} from "react";


function App() {
    let [userName, setUserName] = useState("");
    // create a new state variable and call it repoList
    // of course you have to create the setRepoList method
    // and this is going to work with useState
    // useState is going to have an initial value of knowledge
    // Note: we retrieve the data from our fetch
    let [repoList, setRepoList] = useState(null);
    // program some other functionality for controlling our list
    let [pageCount, setPageCount] = useState(10);
    // we will look for items that have the keyword tutorial
    let [queryString, setQueryString] = useState("");

    let [totalCount, setTotalCount] = useState(null);

    let [startCursor, setStartCursor] = useState(null);
    let [endCursor, setEndCursor] = useState(null);
    let [hasPreviousPage, setHasPreviousPage] = useState(false);
    let [hasNextPage, setHasNextPage] = useState(true);
    let [paginationKeyword, setPaginationKeyword] = useState("first");
    let [paginationString, setPaginationString] = useState("");


    // const fetchData and we'll have it do the useCallback hook
    const fetchData = useCallback(() => { // when I pass along the query I need to pass along all those variables as well.
        const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));

        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers,
            body: queryText

        }).then((response) => response.json()).then((data) => {
            const viewer = data.data.viewer;
            // repos is actually going to be in data.data and then .search .nodes (data.data.search.nodes) -it's no longer under viewer
            // as it was before.It's in a different place, so I decided to create its own variable for it.

            const repos = data.data.search.edges;
            const total = data.data.search.repositoryCount;
            const start = data.data.search.pageInfo.startCursor;
            const end = data.data.search.pageInfo.endCursor;
            //sometimes when I get data back from the server some of that data
            //comes along with a null value and the loop that is printing out doesn't like to
            //print out null values. So, I can use one of JS new operator types: it's a question mark and a period
            //what that does is called an optional chaining operator, it essentially convert the value coming in
            //if it's null into an undefined value
            const next = data.data.search.pageInfo?.hasNextPage;
            const prev = data.data.search.pageInfo?.hasPreviousPage;


            setUserName(viewer.name);
            // get the nodes from the repositories
            // I should retrieve all the information
            setRepoList(repos);
            // setTotalCount method and pass along that total that I now have
            setTotalCount(total);

            setStartCursor(start);
            setEndCursor(end);
            setHasNextPage(next);
            setHasPreviousPage(prev);

        }).catch((err) => {
            console.log(err);
        });

        // we need to specify a list of dependencies that will
        // cost this useCallback to be used, hence the ", []"
        // I will be adding things here [] as I need certain
        // elements that are going to be changing to go ahead
        // and trigger a new fetch of the data
    }, [pageCount, queryString, paginationKeyword, paginationString]);


    // create arrow function
    useEffect(() => {
        // I'll create a constant for my query
        // I'll move it later to another separate file
        // const githubQuery = {
        // //I just want to see the viewer's name
        // query: `
        // {
        //     viewer {
        //       name
        //     }
        // }
        // `,
        // };
        // and then I'm going to use the fetch API. Just
        // regular JavaScript API, and use the github object I imported
        // from db.js (github) and then read the baseURL (github.baseURL)
        // and then pass along an object here, that it's going to say
        // method and the method needs to be POST.
        // You can use a git method, but not when you use headers

        // fetch(github.baseURL, {
        // method: "POST",
        // headers: github.headers,
        // //stringify is a method that converts some JSON data
        // //which we're going to be reading from this Github query
        // //into a string. We'll pass along the githubQuery variable
        // //that we define.
        // body: JSON.stringify(query),
        // })
        // //and with fetch, fetch is a promise based API
        // //so then you're going to receive a response from the server
        // //hopefully everything goes well.
        // //& I'm going to take that response and convert it to JSON
        // //because of the response you're going to get is essentially
        // //what would happen if we click on the Github Explorer > button
        // //but we need to convert it into JSON
        // .then((response) => response.json())
        // //if the conversion to JSON is successful, then I'm going
        // //to receive some data, which I will then pass along
        // .then((data) => {
        //     //{useState}: when I get my data I want to use the
        //     //method called setUserName and then go through my data
        //     //The first data is the variable that I placed the JSON into,
        //     //and then it returns the thing called data in there
        //     //and then I need to say viewer and the variable in there
        //     //is called name that has the name
        //     setUserName(data.data.viewer.name);
        //     //We'll output it in the console
        //     console.log(data);
        // })
        // //handle the error
        // .catch((err => {
        //     console.log(err);
        // }))

        // this fetchData method has a dependency and
        // needs to be put in an array [fetchData]
        fetchData();
    }, [fetchData]);
    return (<div className="App container mt-5">
        <h1 className="text-primary">
            <i className="bi bi-diagram-2-fill"></i>Repos
                      hi
        </h1>
        <p>Hey there {userName}</p>
        <SearchBox totalCount={totalCount}
            pageCount={pageCount}
            queryString={queryString}
            onTotalChange={
                (myNumber) => {
                    setPageCount(myNumber)
                }
            }
            onQueryChange={
                (myString) => {
                    setQueryString(myString)
                }
            }/>

        <NavButtons start={startCursor}
            end={endCursor}
            next={hasNextPage}
            previous={hasPreviousPage}
            onPage={
                (myKeyword, myString) => {
                    setPaginationKeyword(myKeyword);
                    setPaginationString(myString);

                }
            }/>


        <p>Print out the repo list
        </p>
        {
        repoList && (<ul className="list-group list-group-flush">
            'then output each of the items
            
                      'It's a little bit better to put things on their own
                      'component. {
            // use the map method
            repoList.map((repo) => (
                // now I can output each of the list items

                /*I'm going to componetize all of this list,
              'item stuff, RepoInfo creates a new component */ <RepoInfo key={
                        repo.node.id
                    }
                    repo={
                        repo.node
                    }/>
            ))
        } </ul>)
    } </div>);
}

export default App;

