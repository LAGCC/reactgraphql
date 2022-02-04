//This is going to pass along some information from our main
//application, mainly the repository that we want to output here.
const RepoInfo = ({repo}) => {

    let license;

    switch (repo.licenseInfo?.spdxId) {

        case undefined:
            license = (
            <span className = "px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger" style = {{fontSize: ".6em" }}>
                NO LICENSE 
            </span>
            );
            break;

        case "NOASSERTION" : 
            license = (<span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning" style={{fontSize: ".6em"}}>
            {repo.licenseInfo.spdxId} 
            </span>
            );
            break;

        default: 
            license = (<span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-success" style={{fontSize: ".6em"}}>
            {
            repo.licenseInfo.spdxId

            }

            </span>
        ); 
    } 
  
    //"return ()" because that's how it works better with JSX
    return (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column"> 
                <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                 {repo.name}  
                 </a>
                 <p className="small"> {repo.description}</p>   
              </div> 
               <div className="text-nowrap ms-3">
                    {license} 
               </div>
              <span className={
                  "px-1 py-0 ms-1 d-inline-block btn btn-sm " +
                  (
                      repo.viewerSubscription === "SUBSCRIBED" 
                      ? "btn-success"
                      : "btn-outline-secondary"
                  )
                } style= {{fontSize: ".6em" }}>
                {repo.viewerSubscription}
            </span>
        </div>

    );
};

export default RepoInfo;

