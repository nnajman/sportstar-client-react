import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteCategory(props) {

    const history = useHistory();
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [error, setError] = useState("");

    const categoryID = props.location.state.category.id;

    useEffect(() => {
        fetch('http://localhost:8080/Categories/'+categoryID)
        .then((response) => response.json())
        .then((data) => { setCategoryDetails(data.category)})
        .catch(error => {
            if (error.status === 404)
                history.push("NotFound");
        });
            
    }, [categoryID, history]);

    if (categoryDetails === null)
        return "";
    
    const deleteCategory = () => {  

        if (props.token.token) {
            fetch('http://localhost:8080/Categories/'+categoryID, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': 'Bearer ' + props.token.token},
                method:'delete'}).then((response) =>  {
                    if ((response.status === 500)){ 
                        setError("Server inner problem");
                        } else if (response.status === 404) {
                        history.push("NotFound");
                        }else if (response.status !== 200) {
                        setError(response.statusText);
                        } else if (response.status === 200){
                        history.push("/Categories");
                        } else {
                        setError("Unknown problem");
                        }
                 });
            
        }
    }

    return (

        <div className="container rounded bg-white mt-5 center width-auto">
         <div className="row justify-content-center blue-background ">
            <div className="col-md-4 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                    <h3 className="font-weight-bold">{categoryDetails.title}</h3>
                    <img className="rounded-circle mt-5" src={"http://localhost:8080/" + categoryDetails.image} width={160} alt=""/>
                </div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                        <h6 className="bold"><Link to ={'/Products'}>Back to categories</Link></h6>
                        </div>
                    </div>
                    <div className="row mt-2">
                        
                        <div className="col-md-6">
                            <label htmlFor="Name">Title</label>
                            <input type="Title" className="form-control" placeholder="Title" defaultValue={categoryDetails.title} disabled /></div>
                        <div className="col-md-6">
                            <label htmlFor="Gender">Gender</label>
                            <input type="Gender" className="form-control" placeholder="Gender" defaultValue={categoryDetails.gender} disabled /></div>
                    </div>
                    <div className="mt-5 text-right"><button className="btn delete-button" type="button"
                        onClick={deleteCategory}>Delete Category
                        </button>
                    </div>
                    {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                         {error}
                    </Alert>
                 )}
                </div>
            </div>
            </div>
        </div>

    )

}
