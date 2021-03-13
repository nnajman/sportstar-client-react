import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddCategory(props) {
   
    const [title, setTitle] = useState(null);
    const [error, setError] = useState("");
    
    const history = useHistory();

    const newCategory = () => {
        var NewCategory = {
            'title': title,
            'gender': props.location.state.gender
        };

        var formData = new FormData();
        const fileField = document.querySelector('input[type="file"]').files[0];

        for (var property in NewCategory) {
            formData.append(property,NewCategory[property]);
        }

        if (fileField) {
            formData.append('image',fileField);
        }

        const message = fetch('http://localhost:8080/Categories', 
        {
            headers: {'Authorization': 'Bearer ' + props.token.token},
            method:'POST',
            body: formData
        })
        .then(data => data.json());

        if ((message.status === 500)){ 
            setError("Server inner problem");
            } else if (message.status === 404) {
            history.push("NotFound");
            }else if (message.status !== 200) {
            setError(message.message);
            } else if (message.status === 200){
            history.push("/Categories");
            } else {
            setError("Unknown problem");
            }
    }

        return (
        
        <div className="container rounded bg-white mt-5 center width-auto">
         <div className="row justify-content-center blue-background ">
            <div className="col-md-8">
                <div className="p-3 py-5">
                <div className="d-flex justify-content-between  mb-3"> 
                    <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                    <h6 className="bold"><Link to ={'/Categories'}>Back to Categories</Link></h6>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="form-group col-md-6">
                        <label htmlFor="Title">Title</label>
                        <input type="Title" className="form-control" placeholder="Title" 
                               onChange={ (e) => setTitle( e.target.value ) }/>
                    </div>
                    <div className="form-group col-md-6">                    
                        <label htmlFor="file">Image</label>
                        <input type='file' className="form-control" /> 
                    </div>
                </div>

                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" type="button"
                     onClick={newCategory}>Create</button></div>
                </div>
                {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                         {error}
                    </Alert>
                 )}
            </div>
            </div>
      </div>
    )
    
}